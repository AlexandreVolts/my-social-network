import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  secondary?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "reset" | "button" | "submit";
  onClick?: () => void;
}
export function Button(props: ButtonProps) {
  const primary = props.secondary ? "border-2" : "text-white";
  const style = {
    primary:
      "bg-blue-600 hover:bg-blue-500 active:bg-blue-800 disabled:bg-gray-300 ",
    secondary:
      "border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500 active:border-blue-800 active:text-blue-800 disabled:border-gray-300 disabled:text-gray-300",
  };
  const size = {
    sm: "px-6 h-7",
    md: "px-10 h-10",
    lg: "px-16 h-12",
  };
  const iconOnly = props.icon && !props.label.length ? "hidden" : "";

  return (
    <motion.button
      whileTap={{ scale: props.disabled ? 1 : 0.97 }}
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`
                ${primary} 
                ${size[props.size ?? "md"]} 
                ${style[props.secondary ? "secondary" : "primary"]} 
                rounded-md
                transition`}
    >
      <span className="flex space-x-2">
        {props.icon ?? <></>}
        <span className={`${iconOnly} line-clamp-1`}>{props.label}</span>
      </span>
    </motion.button>
  );
}
