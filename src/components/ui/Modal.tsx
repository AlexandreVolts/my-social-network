import { ReactNode } from "react";
import { Overlay } from "./Overlay";
import { Card } from "./Card";
import { IconX } from "@tabler/icons-react";

interface ModalProps {
  opened: boolean;
  title: string;
  children: ReactNode;
  closeOnClickOutside?: boolean;
  onClose: () => void;
}

export function Modal(props: ModalProps) {
  return (
    <Overlay
      opened={props.opened}
      onClick={props.closeOnClickOutside ? props.onClose : () => {}}
      opacity={true}
    >
      <Card>
        <div className="space-y-2 w-96">
          <div className="flex items-center justify-between space-x-2">
            <h3 className="text-xl">{props.title}</h3>
            <IconX onClick={props.onClose} className="cursor-pointer" />
          </div>
          <div>{props.children}</div>
        </div>
      </Card>
    </Overlay>
  );
}
