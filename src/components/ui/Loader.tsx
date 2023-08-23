import { IconLoader2 } from "@tabler/icons-react";
import { ReactNode } from "react";

interface LoaderProps {
  isLoading?: boolean;
  children: ReactNode;
}
export function Loader(props: LoaderProps) {
  if (props.isLoading)
    return (<IconLoader2 className="animate-spin" />)
  return (props.children);
}