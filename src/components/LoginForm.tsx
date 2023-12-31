import { Button } from "./ui/Button";
import { TextInput } from "./ui/TextInput";
import { PasswordInput } from "./ui/PasswordInput";
import { Card } from "./ui/Card";
import { LoginFormData } from "@/types/LoginFormData";
import { IconLogin } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import * as yup from "yup";
import { Loader } from "./ui/Loader";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onSwitch: () => void;
  isLoading?: boolean;
}
export function LoginForm(props: LoginFormProps) {
  const t = useTranslations("Form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const schema = yup.object({
    email: yup
      .string()
      .required(t("error.email-required"))
      .email(t("error.email-email")),
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

  const onChange = <T,>(
    val: T,
    setter: (val: T) => void,
    errorSetter: (val: string) => void
  ) => {
    setter(val);
    errorSetter("");
  };

  return (
    <motion.form onSubmit={onSubmit}>
      <Card>
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">{t("login")}</h2>
          <div className=" grow space-y-2">
            <TextInput
              value={email}
              onChange={(val) => onChange(val, setEmail, setErrorEmail)}
              label={t("email")}
              placeholder={t("email-holder")}
              error={errorEmail}
              disabled={props.isLoading}
            />
            <PasswordInput
              value={password}
              onChange={(val) => onChange(val, setPassword, setErrorPassword)}
              label={t("password")}
              placeholder=""
              error={errorPassword}
              disabled={props.isLoading}
            />
          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <Button
                onClick={props.onSwitch}
                label={t("switch-to-register")}
                secondary
                disabled={props.isLoading}
              />
            </div>
            <Button
              type="submit"
              label={t("login")}
              disabled={props.isLoading}
              icon={
                <Loader isLoading={props.isLoading}>
                  <IconLogin />
                </Loader>
              }
            />
          </div>
        </div>
      </Card>
    </motion.form>
  );
}
