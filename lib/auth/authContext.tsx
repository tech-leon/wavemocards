"use client";
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { onIdTokenChanged, User, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { preSignUp } from "@/lib/api";
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

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("authUser");
    setUser(null);
  };

  const contextValue = useMemo(() => ({
    user,
    loading,
    logout,
    signUp,
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
} => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
