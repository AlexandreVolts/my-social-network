"use client";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next-intl/client";

export default function Login() {
  const handlers = useLogin();
  const router = useRouter();

  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <h2 className="text-5xl p-8">My Social Network</h2>
        <LoginForm
          onSubmit={handlers.signIn}
          onSwitch={() => router.push("/register")}
        />
      </main>
      <Footer />
    </>
  );
}
