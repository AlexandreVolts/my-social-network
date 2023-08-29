import { use, useEffect, useState } from "react";

export function useQuery<T>(callback: () => Promise<T>) {
  const raw = use(callback());
  const [data, setData] = useState<T>();

  const update = () => {
    callback().then(setData);
  };

  useEffect(() => {
    if (!data && raw) {
      setData(raw);
    }
  }, [raw, data]);
  return { data, handlers: { update }};
}