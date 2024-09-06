'use client'
import { useTranslation } from "react-i18next";
import LoginForm from "@/components/login-form";

export default function AuthPage() {
  const { t } = useTranslation();
  return (
    <div>
      <LoginForm />
    </div>
  ); 
}