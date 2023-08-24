import { MouseEvent, ReactNode, useId } from "react";

interface OverlayProps {
  opened?: boolean;
  opacity?: boolean;
  onClick: () => void;
  children?: ReactNode;
}
export function Overlay(props: OverlayProps) {
  const id = useId();
  const display = props.opened ? "" : "hidden";
  const opacity = props.opacity ? "bg-black bg-opacity-60" : "";

  const onClick = (e: MouseEvent) => {
    // @ts-ignore
    if (e.target.id === id) props.onClick();
  };
  return (
    <div
      id={id}
      onClick={onClick}
      className={`fixed left-0 top-0 w-full h-full flex items-center justify-center z-10 ${display} ${opacity}`}
    >
      {props.children}
    </div>
  );
}
