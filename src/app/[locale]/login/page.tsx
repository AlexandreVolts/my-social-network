"use client";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { useLogin } from "@/hooks/useLogin";
import { LoginFormData } from "@/types/LoginFormData";
import { useRouter } from "next-intl/client";

export default function Login() {
  const { values, handlers } = useLogin();
  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    handlers.signIn(
      data,
      () => {},
      () => {}
    );
  };
  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <h2 className="text-5xl p-8">My Social Network</h2>
        <LoginForm
          onSubmit={onSubmit}
          onSwitch={() => router.push("/register")}
          isLoading={values.isLoading}
        />
      </main>
      <Footer />
    </>
  );
}
