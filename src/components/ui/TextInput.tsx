import { BaseInputProps } from "@/types/BaseInputProps";
import { motion } from "framer-motion";
import { ReactNode, useId, useRef, useState } from "react";

interface TextInputProps extends BaseInputProps {
  withRightIcon?: ReactNode;
  withIcon?: ReactNode;
  type?: "text" | "password" | "search" | "button";
}
export function TextInput(props: TextInputProps) {
  const [isActive, setIsActive] = useState(false);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);

  const border = isActive
    ? "border-blue-800"
    : props.error
    ? "border-red-600"
    : "border-gray-300";
  const disabled = props.disabled
    ? "border-gray-300 bg-gray-300 text-gray-400"
    : "bg-white";
  const cursor =
    props.type === "button" && !props.disabled ? "cursor-pointer" : "";

  return (
    <motion.div
      whileTap={{ scale: props.disabled ? 1 : 0.97 }}
      onClick={() => ref.current?.focus()}
      onMouseEnter={() => setIsMouseIn(true)}
      onMouseLeave={() => setIsMouseIn(false)}
      className="grow"
    >
      <label htmlFor={id}>{props.label}</label>
      <div
        className={`${border} ${disabled} rounded-sm transition border-2 p-2 flex space-x-2`}
      >
        {props.withIcon ?? <></>}
        <input
          ref={ref}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          type={props.type === "button" ? "text" : props.type ?? "text"}
          placeholder={props.placeholder}
          id={id}
          size={1}
          disabled={props.disabled}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(isMouseIn)}
          readOnly={props.readOnly}
          className={`${disabled} ${cursor} focus:outline-none grow`}
        />
        {props.withRightIcon ?? <></>}
      </div>
      {props.error ? <p className="text-red-600">{props.error}</p> : <></>}
    </motion.div>
  );
}
