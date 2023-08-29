import { ReactNode } from "react";
import { Overlay } from "./Overlay";
import { motion } from "framer-motion";
import { MouseEvent } from "react";

interface DropdownProps {
  opened: boolean;
  target: ReactNode;
  children: ReactNode;
  stopPropagation?: boolean;
  onOpen: () => void;
  onClose: () => void;
}
interface DropdownItemProps {
  children: ReactNode;
  onClick: (e: MouseEvent) => void;
}
function Dropdown(props: DropdownProps) {
  const onOpen = (e: MouseEvent) => {
    if (props.stopPropagation) {
      e.stopPropagation();
    }
    props.onOpen();
  };

  const onClose = (e: MouseEvent) => {
    if (props.stopPropagation) {
      e.stopPropagation();
    }
    props.onClose();
  };

  return (
    <>
      <div className="relative">
        <span onClick={onOpen}>{props.target}</span>
        <motion.ul
          initial={{scale: 0}}
          animate={{ scale: props.opened ? 1 : 0 }}
          onClick={onClose}
          className="absolute z-20 cursor-pointer"
        >
          {props.children}
        </motion.ul>
      </div>
      {/*TODO: there still is click propagation on overlay*/}
      <Overlay opened={props.opened} onClick={props.onClose}/>
    </>
  );
}

function DropdownItem(props: DropdownItemProps) {
  return (
    <li
      onClick={props.onClick}
      className="flex space-x-2 p-2 bg-white hover:bg-gray-100 cursor-pointer"
    >
      {props.children}
    </li>
  );
}

Dropdown.Item = DropdownItem;

export { Dropdown };
