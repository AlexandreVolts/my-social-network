"use client";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { useLogin } from "@/hooks/useLogin";
import { useUser } from "@/hooks/useUser";
import { LoginFormData } from "@/types/LoginFormData";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next-intl/client";
import { useEffect } from "react";

export default function Login() {
  const supabase = createClientComponentClient();
  const { values, handlers } = useLogin(supabase);
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    handlers.signIn(
      data,
      () => router.push('/post'),
      () => {}
    );
  };

  useEffect(() => {
    if (isComplete && user) {
      router.push("/home");
    }
  });

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
