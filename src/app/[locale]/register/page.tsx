"use client";
import { Footer } from "@/components/Footer";
import { RegisterForm } from "@/components/RegisterForm";
import { Toaster } from "@/components/ui/Toaster";
import { useLogin } from "@/hooks/useLogin";
import { useUser } from "@/hooks/useUser";
import { RegisterFormData } from "@/types/RegisterFormData";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { useEffect, useState } from "react";

export default function Register() {
  const supabase = createClientComponentClient();
  const t = useTranslations('Utils');
  const router = useRouter();
  const { values, handlers } = useLogin(supabase);
  const { user, isComplete } = useUser(supabase);
  const [error, setError] = useState('');

  const onSubmit = (data: RegisterFormData) => {
    handlers.register(
      data,
      () => router.push("/login"),
      (e) => setError(e.message),
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
        <Toaster
          opened={!!error}
          title={t("on-fail")}
          message={error}
          onClose={() => setError("")}
        />
      </main>
      <Footer />
    </>
  );
}
