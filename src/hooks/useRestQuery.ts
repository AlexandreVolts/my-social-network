import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { useQuery } from "./useQuery";
import { useState } from "react";

type Action = "create" | "update" | "delete";

export function useRestQuery<T>(
  client: SupabaseClient,
  table: string,
  initializer: (client: SupabaseClient) => Promise<PostgrestSingleResponse<T[]>>
) {
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<Action>();
  const { data, handlers } = useQuery(() => initializer(client));

  const clear = () => {
    setShowMessage(true);
    setIsLoading(false);
    handlers.update();
  };

  const create = (data: Partial<T>) => {
    setIsLoading(true);
    setAction("create");
    client.from(table).insert(data).then(clear);
  };
  const update = (matcher: Partial<T>, data: Partial<T>) => {
    setIsLoading(true);
    setAction("update");
    client.from(table).update(data).match(matcher).then(clear);
  };
  const destroy = (matcher: Partial<T>) => {
    setIsLoading(true);
    setAction("delete");
    client.from(table).delete().match(matcher).then(clear);
  };

  return {
    data: {
      data: data?.data,
      error: data?.error,
      showMessage,
      isLoading,
      action,
    },
    handlers: {
      create,
      update,
      delete: destroy,
      dismissMessage: () => setShowMessage(false),
    },
  };
}
