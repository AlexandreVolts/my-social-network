import { Overlay } from "./Overlay";
import { ActionIcon } from "./ActionIcon";
import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface DrawerProps {
  opened: boolean;
  title?: string;
  children: ReactNode;
  closeOnClickOutside?: boolean;
  onClose: () => void;
}
export function Drawer(props: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Overlay
        opened={props.opened}
        onClick={props.closeOnClickOutside ? props.onClose : () => {}}
        opacity
      />
      <motion.nav
        ref={ref}
        initial={{ x: -(ref.current?.offsetWidth ?? 0) }}
        animate={{ x: props.opened ? 0 : -(ref.current?.offsetWidth ?? 0) }}
        className="p-2 absolute left-0 top-0 w-96 bg-white h-screen overflow-auto z-20"
      >
        <div className="flex items-center justify-between space-x-2">
          <h3 className="text-xl font-bold">{props.title}</h3>
          <ActionIcon onClick={props.onClose}>
            <IconX />
          </ActionIcon>
        </div>
        {props.children}
      </motion.nav>
    </>
  );
}
