"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useUser } from "@/hooks/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function About() {
  const supabase = createClientComponentClient();
  const user = useUser(supabase);

  return (
    <>
      <Header isLoggedIn={!!user} />
      <main className="flex flex-col items-center justify-between p-24"></main>
      <Footer />
    </>
  );
}
