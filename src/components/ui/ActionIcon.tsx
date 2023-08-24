import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ActionIconProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function ActionIcon(props: ActionIconProps) {
  return (
    <motion.button
      whileTap={{ scale: props.disabled ? 1 : 0.9 }}
      disabled={props.disabled}
      onClick={props.onClick}
      className="p-1 enabled:hover:bg-gray-100 rounded-full disabled:text-gray-200"
    >
      {props.children}
    </motion.button>
  );
}
