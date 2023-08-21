import { LoginFormData } from "@/app/types/LoginFormData";
import { Button } from "./ui/Button";
import { TextInput } from "./ui/TextInput";
import { PasswordInput } from "./ui/PasswordInput";
import { Card } from "./ui/Card";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import * as yup from "yup";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onSwitch: () => void;
}
export function LoginForm(props: LoginFormProps) {
  const t = useTranslations("Form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //errors
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const schema = yup.object({
    email: yup.string().required(t("error.email-required")),
    password: yup.string().required(t("error.password-required")),
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    schema
      .validate({ email, password }, { abortEarly: false })
      .then(props.onSubmit)
      .catch((err: yup.ValidationError) => {
        err.inner.forEach((error) => {
          switch (error.path) {
            case "email":
              setErrorEmail(error.message);
              break;
            case "password":
              setErrorPassword(error.message);
              break;
          }
        });
      });
  };

  return (
    <motion.form onSubmit={onSubmit}>
      <Card>
        <div className="space-y-8">
          <h1 className="text-3xl">{t("login")}</h1>
          <div className=" grow space-y-2">
            <TextInput
              value={email}
              onChange={setEmail}
              label={t("email")}
              placeholder={t("email-holder")}
              error={errorEmail}
            />
            <PasswordInput
              value={password}
              onChange={setPassword}
              label={t("password")}
              placeholder=""
              error={errorPassword}
            />
          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <Button
                onClick={props.onSwitch}
                label={t("switch-to-register")}
                secondary
              />
            </div>
            <Button label={t("login")} type="submit" />
          </div>
        </div>
      </Card>
    </motion.form>
  );
}
