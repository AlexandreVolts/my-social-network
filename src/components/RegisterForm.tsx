import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { Card } from "./ui/Card";
import { TextInput } from "./ui/TextInput";
import { PasswordInput } from "./ui/PasswordInput";
import { DatePicker } from "./ui/DatePicker";
import { Button } from "./ui/Button";

interface RegisterFormProps {
    onSubmit: () => void;
}

export function RegisterForm(props: RegisterFormProps) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState('');
    const [email, setEmail] = useState(''); 
    const [birthday, setBirthday] = useState<Date>(new Date());

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmit();
    } 

    return (
        <motion.form onSubmit={onSubmit}>
            <Card>
                <div>
                    <h1>Register</h1>
                </div>
                <div className="flex">
                    <TextInput 
                        value={name}
                        onChange={setName}
                        label=""
                        placeholder="Name"
                    />
                    <TextInput 
                        value={surname}
                        onChange={setSurname}
                        label=""
                        placeholder="Surname"
                    />
                </div>
                <TextInput 
                    value={email}
                    onChange={setEmail}
                    label=""
                    placeholder="Your email"
                />
                <PasswordInput
                    value={password}
                    onChange={setPassword}
                    label="Password"
                />
                <PasswordInput 
                    value={confirmPw}
                    onChange={setConfirmPw}
                    label="Confirm Password"
                />
                <DatePicker 
                    date={birthday}
                    onChange={setBirthday}
                    label="Your birthday"
                />
                <Button label="Submit"/>      
            </Card>
        </motion.form>
    )
}