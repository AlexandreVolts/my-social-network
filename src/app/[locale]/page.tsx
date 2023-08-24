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

export default function Home() {
  const supabase = createClientComponentClient();
  const { values, handlers } = useLogin(supabase);
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();
  const [onLoginPage, setOnLoginPage] = useState(false);

  const onSubmitRegister = (data: RegisterFormData) => {
    handlers.register(
      data,
      () => {
        // TODO: Say to the user to check his emails
        console.log("Register successful");
      },
      (e) => {
        // TODO: Catch errors here
        console.error(e);
      }
    );
  };
  const onSubmitLogin = (data: LoginFormData) => {
    handlers.signIn(
      data,
      () => router.push('/home'),
      (e) => console.error(e)
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
    </main>
  );
}
