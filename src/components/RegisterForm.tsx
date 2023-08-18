import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { Card } from "./ui/Card";
import { TextInput } from "./ui/TextInput";
import { PasswordInput } from "./ui/PasswordInput";
import { DatePicker } from "./ui/DatePicker";
import { Button } from "./ui/Button";
import { RegisterFormData } from "@/app/types/RegisterFormData";
import * as yup from "yup";

interface RegisterFormProps {
    onSubmit: (data: RegisterFormData) => void;
}

export function RegisterForm(props: RegisterFormProps) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState<Date>(new Date());
    //error hooks
    const [errorName, setErrorName] = useState("");
    const [errorSurname, setErrorSurname] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorBirthday, setErrorBirthday] = useState("");

    const minAge = 13;

    const schema = yup.object({
        name: yup.string().required(),
        surname: yup.string().required(),
        password: yup.string().required().test("same-pwd", "Password and confirm password fields must be the same", (val) => val === confirmPw).min(8),
        email: yup.string().required().email(),
        birthday: yup.date().required().test("min-age", "Must be at least 13", (val) => {
            const curDate = new Date();
            curDate.setFullYear(curDate.getFullYear() - minAge);
            return val < curDate
        }),
    })


    const onSubmit = (e: FormEvent) => {
        const data: RegisterFormData = { name, surname, password, email, birthday }
        e.preventDefault();
        schema.validate(data, { abortEarly: false })
            .then(props.onSubmit)
            .catch((err: yup.ValidationError) => {
                err.inner.forEach((error) => {
                    switch (error.path) {
                        case "name": setErrorName(error.message);
                            break;
                        case "surname": setErrorSurname(error.message);
                            break;
                        case "email": setErrorEmail(error.message);
                            break;
                        case "password": setErrorPassword(error.message);
                            break;
                        case "birthday": setErrorBirthday(error.message);
                            break;
                    }

                })
            })
    }

    const onChange = <T,>(val: T, setter: (val: T) => void, errorSetter: (val: string) => void) => {
        setter(val);
        errorSetter("");
    }

    return (
        <motion.form onSubmit={onSubmit} >
            <Card>
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl">Register</h2>
                    </div>
                    <div className="space-y-2">
                        <div className="space-x-2 flex">
                            <div className="grow">
                                <TextInput
                                    value={name}
                                    onChange={(str) => onChange(str, setName, setErrorName)}
                                    label="Name"
                                    placeholder="Ex: Jean"
                                    error={errorName}
                                />
                            </div>
                            <div className="grow">
                                <TextInput
                                    value={surname}
                                    onChange={(str) => onChange(str, setSurname, setErrorSurname)}
                                    label="Surname"
                                    placeholder="Ex: Dupont"
                                    error={errorSurname}
                                />
                            </div>
                        </div>
                        <TextInput
                            value={email}
                            onChange={(str) => onChange(str, setEmail, setErrorEmail)}
                            label="Email"
                            placeholder="Ex: jean.dupont@email.com"
                            error={errorEmail}
                        />
                        <PasswordInput
                            value={password}
                            onChange={(str) => onChange(str, setPassword, setErrorPassword)}
                            label="Password"
                            error={errorPassword}
                        />
                        <PasswordInput
                            value={confirmPw}
                            onChange={setConfirmPw}
                            label="Confirm Password"
                        />
                        <DatePicker
                            date={birthday}
                            onChange={(date) => onChange(date, setBirthday, setErrorBirthday)}
                            label="Your birthday"
                            error={errorBirthday}
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