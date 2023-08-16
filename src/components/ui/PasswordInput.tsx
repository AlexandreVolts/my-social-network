import { ReactNode, useState } from "react";
import { TextInput } from "./TextInput";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface PasswordInputProps {
    label: string;
    value: string;
    placeholder?: string
    error?: string;
    disabled?: boolean;
    withIcon?: ReactNode;
    onChange: (value: string)=>void;
}

export function PasswordInput(props: PasswordInputProps) {
    const [isHidden, setIsHidden] = useState(true);

    const onEyeClick = () => {
        if (!props.disabled) {
            setIsHidden(!isHidden)
        }
    }

    return(
        <TextInput 
            value={props.value}
            onChange={props.onChange}
            label={props.label}
            placeholder={props.placeholder??""}
            error={props.error}
            disabled={props.disabled}
            withIcon={props.withIcon}
            type={isHidden?"password":"text"}
            withRightIcon={
                !isHidden?<IconEye onClick={onEyeClick}/>:
                <IconEyeOff onClick={onEyeClick}/>
            }
        />
    )
}