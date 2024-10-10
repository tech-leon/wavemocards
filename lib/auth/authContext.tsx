"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { User } from "firebase/auth";
import { userStateListener, signInUser, signUserOut } from "@/lib/auth/utils";
import { preSignUp, getUserData } from "@/lib/api";
import { FirebaseError } from "firebase/app";

export const AuthContext = createContext<{
  user: User | null;
  userData: string | null;
  userToken: string | null;
  loading: boolean;
  logout: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    birthdate: string,
    occupation: string,
    timezone: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = userStateListener(async (user) => {
      if (user) {
        setUser(user);
        if (process.env.NODE_ENV !== "production") {
          localStorage.setItem("authUser", JSON.stringify(user));
        }
        await user.getIdToken(true).then((token) => {
          setUserToken(token);
        });
      } else {
        localStorage.clear();
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    name: string,
    birthdate: string,
    occupation: string,
    timezone: string
  ) => {
    try {
      await preSignUp(email, password, name, birthdate, occupation, timezone);
      const userCredential = await signInUser(email, password);
      setUser(userCredential.user);
      const token = await userCredential.user.getIdToken();
      const userData = await getUserData(userCredential.user.uid, token);
      setUserData(userData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("註冊錯誤:", error.message);
      }
      let message = "註冊失敗，請檢查您的資料。";
      if ((error as FirebaseError).code === "auth/email-already-in-use") {
        message = "該電子郵件已被使用。";
      } else if ((error as FirebaseError).code === "auth/invalid-email") {
        message = "電子郵件格式無效。";
      }
      alert(message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInUser(email, password);
      const token = await userCredential.user.getIdToken();
      const userData = await getUserData(userCredential.user.uid, token);
      setUser(userCredential.user);
      setUserData(userData);
      setUserToken(token);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        let message = "登入失敗，請檢查您的電子郵件和密碼。";
        if (error.code === "auth/user-not-found") {
          message = "找不到使用者，請檢查您的電子郵件。";
        } else if (error.code === "auth/wrong-password") {
          message = "密碼錯誤，請再試一次。";
        }
        throw new Error(message);
      } else {
        throw new Error(`登入時發生未知錯誤: ${error}`);
      }
    }
  };

  const logout = async () => {
    await signUserOut();
    localStorage.removeItem("authUser");
    localStorage.removeItem("userData");
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      logout,
      signUp,
      login,
      userToken,
      userData,
    }),
    [user, loading, userToken, userData]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    birthdate: string,
    occupation: string,
    timezone: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  userToken: string | null;
} => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
