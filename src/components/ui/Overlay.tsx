import { ReactNode } from "react";

interface OverlayProps {
  opened?: boolean;
  opacity?: boolean;
  onClick: () => void;
  children?: ReactNode;
}
export function Overlay(props: OverlayProps) {
  const display = props.opened ? "" : "hidden";
  const opacity = props.opacity ? "bg-black bg-opacity-60" : "";

  return (
    <div
      onClick={props.onClick}
      className={`absolute left-0 top-0 w-full h-full flex items-center justify-center ${display} ${opacity}`}
    >
      {props.children}
    </div>
  );
}