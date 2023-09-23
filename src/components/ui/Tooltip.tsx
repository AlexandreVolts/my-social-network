import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface TooltipProps {
  label: string;
  disabled?: boolean;
  children: ReactNode;
}

export function Tooltip(props: TooltipProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  
  const isTooltipOn = !props.disabled&&isMouseOver

  return (
    <div
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="relative"
      role="tooltip"
    >
      <motion.div
        initial={{ scale: 1, x: "-50%", y: "-50%", opacity: 0}}
        animate={{  scale: isTooltipOn ? 1 : 0, y: isTooltipOn ? "-100%": "-50%", opacity: isTooltipOn ? 1:0 }}
        className="p-2 bg-black text-white absolute left-1/2 z-20 w-max rounded-md drop-shadow-md -top-2"
      >
        <span>{props.label}</span>
      </motion.div>
      <div className="flex">
        {props.children}
      </div>
    </div>
  );
}
