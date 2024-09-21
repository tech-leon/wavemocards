"use client";
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { onIdTokenChanged, User, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { preSignUp, getUserData } from "@/lib/api";
import { auth } from "@/lib/auth/firebase";
import { FirebaseError } from "firebase/app";

export const AuthContext = createContext<{
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
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("authUser", JSON.stringify(user));
        await user.getIdToken(true);
      } else {
        localStorage.removeItem("authUser");
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      localStorage.setItem("authUser", JSON.stringify(userCredential.user));
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await getUserData(userCredential.user.uid);
      setUser(userCredential.user);
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("authUser", JSON.stringify(userCredential.user));
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
        throw new Error("登入時發生未知錯誤。");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("authUser");
    localStorage.removeItem("userData");
    setUser(null);
  };

  const contextValue = useMemo(() => ({
    user,
    loading,
    logout,
    signUp,
    login,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
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
} => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth 必須在 AuthProvider 內使用");
  }
  return context;
};
