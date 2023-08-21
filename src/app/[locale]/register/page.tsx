"use client";
import { RegisterFormData } from "@/app/types/RegisterFormData";
import { Footer } from "@/components/Footer";
import { RegisterForm } from "@/components/RegisterForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [regData, setRegData] = useState<RegisterFormData>();
  const router = useRouter();

  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
          <h1 className="text-5xl p-8">My Social Network</h1>
          <RegisterForm
            onSubmit={setRegData}
            onSwitch={() => router.push("/login")}
          />
      </main>
      <Footer />
    </>
  );
}
