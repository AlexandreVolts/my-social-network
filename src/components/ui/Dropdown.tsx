import { ReactNode } from "react";
import { Overlay } from "./Overlay";
import { motion } from "framer-motion";
import { MouseEvent } from "react";

interface DropdownProps {
  opened: boolean;
  target: ReactNode;
  children: ReactNode;
  onOpen: () => void;
  onClose: () => void;
}
interface DropdownItemProps {
  children: ReactNode;
  onClick: (e: MouseEvent) => void;
}
function Dropdown(props: DropdownProps) {
  return (
    <>
      <div className="relative">
        <span onClick={props.onOpen}>{props.target}</span>
        <motion.ul
          initial={{scale: 0}}
          animate={{ scale: props.opened ? 1 : 0 }}
          onClick={props.onClose}
          className="absolute z-20 cursor-pointer"
        >
          {props.children}
        </motion.ul>
      </div>
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
