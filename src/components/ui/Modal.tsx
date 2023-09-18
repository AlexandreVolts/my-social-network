import { Overlay } from "./Overlay";
import { Card } from "./Card";
import { ActionIcon } from "./ActionIcon";
import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
  opened: boolean;
  title: string;
  children: ReactNode;
  closeOnClickOutside?: boolean;
  onClose: () => void;
}
export function Modal(props: ModalProps) {
  return (
    <>
      <Overlay
        opened={props.opened}
        onClick={props.closeOnClickOutside ? props.onClose : () => {}}
        opacity={true}
      />
      <motion.div
        initial={{ x: '-50%', y: '-50%' }}
        animate={{ scale: props.opened ? 1 : 0 }}
        className="absolute flex w-96 z-20"
      >
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <h3 className="text-xl font-bold">{props.title}</h3>
              <ActionIcon onClick={props.onClose}>
                <IconX />
              </ActionIcon>
            </div>
            <div>{props.children}</div>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
