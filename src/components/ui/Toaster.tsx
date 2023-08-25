import { motion } from "framer-motion";
import { ActionIcon } from "./ActionIcon";
import { IconX } from "@tabler/icons-react";
import { useRef } from "react";

interface ToasterProps {
  opened: boolean;
  title: string;
  message: string;
  isValid?: boolean;
  onClose: () => void;
}

export function Toaster(props: ToasterProps) {
  const ref = useRef<HTMLDivElement>(null);

  const headerColor = props.isValid ? "bg-green-500" : "bg-red-500";
  const bodyColor = props.isValid ? "bg-green-400" : "bg-red-400";

  return (
    <motion.div
      ref={ref}
      animate={{
        y: props.opened ? 0 : 32+(ref.current?.clientHeight??0),
        opacity: props.opened ? 1 : 0,
        scale: props.opened ? 1 : 0.7,
      }}
      className="fixed w-96 right-8 bottom-8 text-white rounded-md overflow-hidden drop-shadow-md"
    >
      <div
        className={` ${headerColor} font-bold flex items-center justify-between space-x-2 pl-2`}
      >
        <h3>{props.title}</h3>
        <ActionIcon onClick={props.onClose}>
          <IconX />
        </ActionIcon>
      </div>
      <p className={`p-2 break-words text-justify ${bodyColor}`}>
        {props.message}
      </p>
    </motion.div>
  );
}
