"use client";
import { Footer } from "@/components/Footer";
import { RegisterForm } from "@/components/RegisterForm";
import { useLogin } from "@/hooks/useLogin";
import { RegisterFormData } from "@/types/RegisterFormData";
import { useRouter } from "next-intl/client";

export default function Register() {
  const { values, handlers } = useLogin();
  const router = useRouter();

  const onSubmit = (data: RegisterFormData) => {
    handlers.register(
      data,
      () => {},
      () => {}
    );
  };

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
