import { LoginFormData } from "@/types/LoginFormData";
import { RegisterFormData } from "@/types/RegisterFormData";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function useLogin() {
  const supabase = createClientComponentClient();

  const register = (data: RegisterFormData) => {
    return supabase.auth.signUp({
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
    });
  };

  const signIn = (data: LoginFormData) => {
    return (supabase.auth.signInWithPassword(data));
  }

  return {
    register,
    signIn,
    signOut: supabase.auth.signOut,
  };
}
