"use client";
import { LoginFormData } from "@/app/types/LoginFormData";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { useRouter } from "next-intl/client";
import { useState } from "react";

export default function Login() {
  const [logData, setLogData] = useState<LoginFormData>();
  const router = useRouter();
  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <h2 className="text-5xl p-8">My Social Network</h2>
        <LoginForm
          onSubmit={setLogData}
          onSwitch={() => router.push("/register")}
        />
      </main>
      <Footer />
    </>
  );
}
