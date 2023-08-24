import { SupabaseClient, User } from "@supabase/supabase-js";
import { useRouter } from "next-intl/client";
import { useEffect, useState } from "react";

export function useUser(client: SupabaseClient) {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [isRequestLaunched, setIsRequestLaunched] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);

  useEffect(() => {
    if (isRequestFinished && !user) {
      router.push('/');
    }
    if (isRequestLaunched) return;
    client.auth.getSession().then((data) => {
      setUser(data.data.session?.user);
      setIsRequestFinished(true);
    });
    setIsRequestLaunched(true);
  }, [isRequestFinished, user, isRequestLaunched, client, router]);
  return user;
}
