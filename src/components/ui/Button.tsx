import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
    secondary?: boolean;
    size?: "sm"|"md"|"lg";
    onClick?: ()=>void;
}

export function Button(props: ButtonProps) {    
    const primary = props.secondary?"border-2":"text-white";
    const style = {
        primary: "bg-blue-600 hover:bg-blue-500 active:bg-blue-800 disabled:bg-gray-300 ",
        secondary: "border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500 active:border-blue-800 active:text-blue-800 disabled:border-gray-300 disabled:text-gray-300",
    }
    const size = {
        sm: "px-6 h-7",
        md: "px-10 h-10",
        lg: "px-16 h-12",
    };
    return (
        <motion.button
            animate={{scale: [0,2, 1]}}
            transition={{scale:{type: "spring"}}}
            className={`
                ${primary} 
                ${size[props.size??"md"]} 
                ${style[props.secondary?"secondary":"primary"]} 
                rounded-sm
                transition`}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            <span className="flex space-x-2">
                {props.icon??<></>}
                <span>{props.label}</span>
            </span>
        </motion.button>
    )
}