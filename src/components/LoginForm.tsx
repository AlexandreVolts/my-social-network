import { LoginFormData } from "@/app/types/LoginFormData";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { TextInput } from "./ui/TextInput";
import { FormEvent, useState } from "react";
import { Card } from "./ui/Card";

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
}

export function LoginForm(props: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmit({email, password})
    }

    return (
        <motion.form onSubmit={onSubmit}>
            <Card>
                <div className="space-y-8">
                    <h1 className="text-3xl">Login</h1>
                    <div className=" grow space-y-2">
                        <TextInput
                            value={email}
                            onChange={setEmail}
                            label="email"
                            placeholder="youremail@something.com"
                        />
                        <TextInput
                            value={password}
                            onChange={setPassword}
                            label="password"
                            placeholder=""
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button label="Submit" />
                    </div>
                </div>
            </Card>
        </motion.form>
    )
}