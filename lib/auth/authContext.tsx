"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { preSignUp } from "@/lib/api";
import { auth } from "@/lib/auth/firebase";

export const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  logout: () => void;
  signUp: (
    email: string,
    password: string,
    name: string,
    birthdate: string,
    occupation: string,
    timezone: string
  ) => void;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("AuthProvider: Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log("AuthProvider: Auth state changed", user);
      if (user) {
        // console.log("AuthProvider: User logged in", user);
        setUser(user);
        localStorage.setItem("authUser", JSON.stringify(user));
        await user.getIdToken(true);
      } else {
        // console.log("AuthProvider: User logged out");
        localStorage.removeItem("authUser");
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      // console.log("AuthProvider: Cleaning up auth state listener");
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
      
      // 註冊成功後自動登入
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      localStorage.setItem("authUser", JSON.stringify(userCredential.user));
      
    } catch (error) {
      console.error("Sign up error:", error);
      alert("註冊失敗，請檢查您的資料。");
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
