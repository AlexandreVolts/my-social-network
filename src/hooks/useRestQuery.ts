import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { useQuery } from "./useQuery";
import { useState } from "react";

export function useRestQuery<T>(
  client: SupabaseClient,
  table: string,
  initializer: (client: SupabaseClient) => Promise<PostgrestSingleResponse<T>>
) {
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, handlers } = useQuery(() => initializer(client));

  const clear = <U>(output: PostgrestSingleResponse<U>) => {
    setShowMessage(true);
    setIsLoading(false);
    handlers.update();
  };

  const create = <U>(data: U) => {
    setIsLoading(true);
    client.from(table).insert(data).then(clear);
  };
  const update = <U>(id: string, data: Partial<U>) => {
    setIsLoading(true);
    client.from(table).update(data).match({ id }).then(clear);
  };
  const destroy = (id: string) => {
    setIsLoading(true);
    client.from(table).delete().match({ id }).then(clear);
  };

  return {
    data: { data: data?.data, error: data?.error, showMessage, isLoading },
    handlers: {
      create,
      update,
      delete: destroy,
      dismissMessage: () => setShowMessage(false),
    },
  };
}
