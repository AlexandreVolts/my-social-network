import { ReactNode } from "react";

interface PinProps {
  children: ReactNode;
  color?: "red" | "blue" | "green";
  value?: number;
  disabled?: boolean;
}

export function Pin(props: PinProps) {
  const bgColor = {
    red: "bg-red-300",
    blue: "bg-blue-300",
    green: "bg-green-300",
  };

  if (props.disabled) {
    return props.children;
  }
  return (
    <div className="relative">
      <div
        className={`${
          bgColor[props.color ?? "blue"]
        } absolute flex items-center w-4 h-4 right-0 top-0 drop-shadow-md rounded-full translate-x-1/3 -translate-y-1/3`}
      >
        <span className="text-xs font-bold w-full text-center">
          {props.value}
        </span>
      </div>
      {props.children}
    </div>
  );
}
