"use client";

import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { useState } from "react";
import { RegisterFormData } from "@/types/RegisterFormData";
import { LoginFormData } from "@/types/LoginFormData";
import { useLogin } from "@/hooks/useLogin";

export default function Home() {
  const [onLoginPage, setOnLoginPage] = useState(false);
  const handlers = useLogin();

  const onSubmitRegister = (data: RegisterFormData) => {
    handlers
      .register(data)
      .then(() => {
        // TODO: Say to the user to check his emails
        console.log('Register successful');
      })
      .catch((e) => {
        // TODO: Catch errors here
        console.error(e);
      });
  };
  const onSubmitLogin = (data: LoginFormData) => {
    handlers
      .signIn(data)
      .then(() => console.log('Login successful'))
      .catch((e) => console.error(e));
  };

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
          />
        ) : (
          <RegisterForm
            onSubmit={onSubmitRegister}
            onSwitch={() => setOnLoginPage(true)}
          />
        )}
      </div>
    </main>
  );
}
