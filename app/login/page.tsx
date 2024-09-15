"use client";
import LoginForm from "@/components/login-form";
import { AuthProvider } from "@/lib/auth/authContext";

export default function AuthPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
