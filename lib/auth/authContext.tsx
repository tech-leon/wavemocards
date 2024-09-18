"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/auth/firebase";

export const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  logout: () => void;
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

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("authUser");
    setUser(null);
  };

  // if (!user) return null;

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
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
