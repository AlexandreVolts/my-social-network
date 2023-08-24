import { ReactNode } from "react";
import { Overlay } from "./Overlay";

interface DropdownProps {
  opened: boolean;
  target: ReactNode;
  children: ReactNode;
  onOpen: () => void;
  onClose: () => void;
}
interface DropdownItemProps {
  children: ReactNode;
  onClick: () => void;
}
function Dropdown(props: DropdownProps) {
  return (
    <>
      <span onClick={props.onOpen}>{props.target}</span>
      {props.opened ? (
        <ul onClick={props.onClose} className="absolute z-20 cursor-pointer">
          {props.children}
        </ul>
      ) : (
        <></>
      )}
      <Overlay opened={props.opened} onClick={props.onClose} />
    </>
  );
}

function DropdownItem(props: DropdownItemProps) {
  return (
    <li
      onClick={props.onClick}
      className="p-2 bg-white hover:bg-gray-100 cursor-pointer"
    >
      {props.children}
    </li>
  );
}

Dropdown.Item = DropdownItem;

export { Dropdown };
