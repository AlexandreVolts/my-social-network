import { motion } from "framer-motion";
import { ReactNode, useId, useState } from "react";

interface TextInputProps {
    label: string;
    value: string;
    placeholder: string;
    error?: string;
    disabled?: boolean;
    withRightIcon?: ReactNode;
    withIcon?: ReactNode;
    type?: "text"|"password"|"search";
    onChange: (value: string) => void;
}

export function TextInput(props: TextInputProps) {
    const [isActive, setIsActive] = useState(false);
    const id = useId();

    const disabled = props.disabled?"border-gray-300 bg-gray-300 text-gray-400":""
    //added text-gray-400 to change icons colors when disabled

    return (
        <motion.div>
            <label htmlFor={`${id}`}>{props.label}</label>
            <div className={`
                    ${props.error?"border-red-600":isActive?"border-blue-800":"border-gray-300"}
                    ${disabled}
                    rounded-sm
                    transition
                    border-2
                    p-2 
                    flex
                    space-x-2
                    `}>
            {props.withIcon??<></>}
            <input
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                type={props.type??"text"}
                placeholder={props.placeholder}
                name={`${id}`}
                disabled={props.disabled}
                onFocus={()=>setIsActive(true)}
                onBlur={()=>setIsActive(false)}
                className={`${disabled} focus:outline-none`}
                
            />
            {props.withRightIcon??<></>}
            </div>
            {props.error?
            <p
                className="text-red-600"
            >{props.error}</p>:<></>}
        </motion.div>
    )
}