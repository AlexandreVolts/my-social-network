import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}
export function Card(props: CardProps) {
  return (
    <div className="p-6 bg-white drop-shadow-md rounded-md grow">
      {props.children}
    </div>
  );
}
