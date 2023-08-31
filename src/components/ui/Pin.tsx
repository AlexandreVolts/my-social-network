import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PinProps {
  children: ReactNode;
  color?: "red" | "blue" | "green";
  notificationNb?: number;
}

export function Pin(props: PinProps) {
  const bgColor = props.color
    ? props.color === "red"
      ? "bg-red-300"
      : props.color === "blue"
      ? "bg-blue-300"
      : "bg-green-300"
    : "bg-blue-300";

  return (
    <div className="relative">
      <motion.div
        //initial={{scale: 1, x: "-50%", y: "-50%"}}
        //animate={{scale: 1, x: "-50%", y: "-50%"}}
        className={`${bgColor} absolute flex items-center w-4 h-4 right-0 end-0 drop-shadow-md rounded-full`}
      >
        <span className="text-xs font-bold w-full text-center">{props.notificationNb}</span>
      </motion.div>
      {props.children}
    </div>
  );
}
