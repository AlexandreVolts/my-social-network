import { BaseInputProps } from "@/types/BaseInputProps";
import { motion } from "framer-motion";
import { useEffect, useId, useRef } from "react";

interface TextAreaProps extends BaseInputProps {}
export function TextArea(props: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const id = useId();

  const border = props.error ? "border-red-600" : "border-gray-300";
  const disabled = props.disabled
  ? "border-gray-300 bg-gray-300 text-gray-400"
  : "bg-white";

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "44px";
      if (ref.current.scrollHeight >= 40)
        ref.current.style.height = (ref.current.scrollHeight + 4) + "px";
    }
  }, [ref, props.value]);
  return (
    <motion.div className="flex flex-col grow" whileTap={{ scale: props.disabled ? 1 : 0.97 }}>
      <label htmlFor={id}>{props.label}</label>
      <textarea
        ref={ref}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        disabled={props.disabled}
        className={`p-2 border-2 ${border} ${disabled} rounded-md resize-none overflow-hidden focus:border-blue-800 focus:outline-none`}
      ></textarea>
      {props.error ? <p className="text-red-600">{props.error}</p> : <></>}
    </motion.div>
  );
}
