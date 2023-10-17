"use client";

import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { useEffect, useState } from "react";
import { RegisterFormData } from "@/types/RegisterFormData";
import { LoginFormData } from "@/types/LoginFormData";
import { useLogin } from "@/hooks/useLogin";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next-intl/client";
import { Toaster } from "@/components/ui/Toaster";
import { useTranslations } from "next-intl";

export default function Home() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const t = useTranslations('Utils');
  const { values, handlers } = useLogin(supabase);
  const { user, isComplete } = useUser(supabase);
  const [onLoginPage, setOnLoginPage] = useState(false);
  const [error, setError] = useState('');

  const onSubmitRegister = (data: RegisterFormData) => {
    handlers.register(
      data,
      () => {
        // TODO: Say to the user to check his emails
        console.log("Register successful");
      },
      (e) => setError(e.message),
    );
  };
  const onSubmitLogin = (data: LoginFormData) => {
    handlers.signIn(
      data,
      () => router.push('/home'),
      (e) => setError(e.message),
    );
  };

  useEffect(() => {
    if (isComplete && user) {
      router.push("/home");
    }
  });

  return (
    <main className="flex min-h-screen justify-between p-24">
      <div className="basis-0 grow">
        <h2 className="text-4xl">My social network</h2>
      </div>
      <div className="basis-0 grow">
        {onLoginPage ? (
          <LoginForm
            onSubmit={onSubmitLogin}
            onSwitch={() => setOnLoginPage(false)}
            isLoading={values.isLoading}
          />
        ) : (
          <RegisterForm
            onSubmit={onSubmitRegister}
            onSwitch={() => setOnLoginPage(true)}
            isLoading={values.isLoading}
          />
        )}
      </div>
      <Toaster
        opened={!!error}
        title={t('on-fail')}
        message={error}
        onClose={() => setError('')}
      />
    </main>
  );
}
