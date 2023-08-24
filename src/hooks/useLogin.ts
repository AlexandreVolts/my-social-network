import { LoginFormData } from "@/types/LoginFormData";
import { RegisterFormData } from "@/types/RegisterFormData";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export function useLogin(client: SupabaseClient) {
  const [isLoading, setIsLoading] = useState(false);

  const load = async <T>(
    promise: Promise<T>,
    onFulfilled: () => void,
    onRejected: (e: any) => void
  ) => {
    setIsLoading(true);
    return promise
      .then(() => {
        setIsLoading(false);
        onFulfilled();
      })
      .catch((e) => {
        setIsLoading(false);
        onRejected(e);
      });
  };

  const register = async (
    data: RegisterFormData,
    onFulfilled: () => void,
    onRejected: (e: any) => void
  ) => {
    return load(
      client.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            name: data.name,
            surname: data.surname,
            birthday: data.birthday,
          },
        },
      }),
      onFulfilled,
      onRejected
    );
  };

  const signIn = async (
    data: LoginFormData,
    onFulfilled: () => void,
    onRejected: (e: any) => void
  ) => {
    return load(
      client.auth.signInWithPassword(data),
      onFulfilled,
      onRejected
    );
  };

  const signOut = async (
    onFulfilled: () => void,
    onRejected: (e: any) => void
  ) => {
    return load(
      client.auth.signOut().then(() => {}),
      onFulfilled,
      onRejected
    );
  };

  return {
    values: { isLoading },
    handlers: { register, signIn, signOut },
  };
}
