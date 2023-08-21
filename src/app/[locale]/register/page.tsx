"use client";
import { Footer } from "@/components/Footer";
import { RegisterForm } from "@/components/RegisterForm";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next-intl/client";

export default function Register() {
  const handlers = useLogin();
  const router = useRouter();

  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
          <h1 className="text-5xl p-8">My Social Network</h1>
          <RegisterForm
            onSubmit={handlers.register}
            onSwitch={() => router.push("/login")}
          />
      </main>
      <Footer />
    </>
  );
}
