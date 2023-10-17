"use client";
import { Header } from "@/components/Header";
import { useRestQuery } from "@/hooks/useRestQuery";
import { useUser } from "@/hooks/useUser";
import { getUserMessages } from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Login() {
  const supabase = createClientComponentClient();
  const { user } = useUser(supabase);
  const { data: messages, handlers: messageHandlers } = useRestQuery(
    supabase,
    "messages",
    () => getUserMessages(supabase, user?.id)
  );

  return (
    <>
      <Header userId={user?.id} />
      <main className="flex flex-col items-center justify-between p-24">
        {messages.data?.map((message, index) => <p key={index}>{message.message}</p>)}
      </main>
    </>
  );
}
