import { motion } from "framer-motion";
import { ReactNode, useId, useRef, useState } from "react";

interface TextInputProps {
    label: string;
    value: string;
    placeholder: string;
    error?: string;
    disabled?: boolean;
    withRightIcon?: ReactNode;
    withIcon?: ReactNode;
    readOnly?: boolean;
    type?: "text" | "password" | "search" | "button";
    onChange: (value: string) => void;
}

export function TextInput(props: TextInputProps) {
    const [isActive, setIsActive] = useState(false);
    const [isMouseIn, setIsMouseIn] = useState(false);
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    const disabled = props.disabled ? "border-gray-300 bg-gray-300 text-gray-400" : "bg-white"
    const cursor = props.type === "button" && !props.disabled ? "cursor-pointer" : "";
    //added text-gray-400 to change icons colors when disabled

    return (
        <motion.div
            onClick={()=>inputRef.current?.focus()}
            onMouseEnter={()=>setIsMouseIn(true)}
            onMouseLeave={()=>setIsMouseIn(false)}
        >
            <label htmlFor={id}>{props.label}</label>
            <div 
                className={`
                    ${props.error ? "border-red-600" : isActive ? "border-blue-800" : "border-gray-300"} 
                    ${disabled} rounded-sm transition border-2 p-2 flex space-x-2`}
            >
                {props.withIcon ?? <></>}
                <input
                    ref={inputRef}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    type={props.type === "button" ? "text" : (props.type ?? "text")}
                    placeholder={props.placeholder}
                    id={id}
                    disabled={props.disabled}
                    onFocus={() => setIsActive(true)}
                    onBlur={()=>setIsActive(isMouseIn)}
                    readOnly={props.readOnly}
                    className={`${disabled} ${cursor} focus:outline-none grow`}

                />
                {props.withRightIcon ?? <></>}
            </div>
            {props.error ?
                <p
                    className="text-red-600"
                >{props.error}</p> : <></>}
        </motion.div>
    )
}