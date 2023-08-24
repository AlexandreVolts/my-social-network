"use client";
import { Footer } from "@/components/Footer";
import { RegisterForm } from "@/components/RegisterForm";
import { useLogin } from "@/hooks/useLogin";
import { useUser } from "@/hooks/useUser";
import { RegisterFormData } from "@/types/RegisterFormData";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next-intl/client";
import { useEffect } from "react";

export default function Register() {
  const supabase = createClientComponentClient();
  const { values, handlers } = useLogin(supabase);
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();

  const onSubmit = (data: RegisterFormData) => {
    handlers.register(
      data,
      () => {},
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
        <h1 className="text-5xl p-8">My Social Network</h1>
        <RegisterForm
          onSubmit={onSubmit}
          onSwitch={() => router.push("/login")}
          isLoading={values.isLoading}
        />
      </main>
      <Footer />
    </>
  );
}
