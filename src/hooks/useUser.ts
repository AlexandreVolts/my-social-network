import { SupabaseClient, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useUser(client: SupabaseClient) {
  const [user, setUser] = useState<User>();
  const [isRequestLaunched, setIsRequestLaunched] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isRequestLaunched) return;
    client.auth.getSession().then((data) => {
      setUser(data.data.session?.user);
      setIsComplete(true);
    });
    setIsRequestLaunched(true);
  }, [isComplete, isRequestLaunched, client]);
  return { user, isComplete };
}
