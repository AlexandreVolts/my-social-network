import { Card } from "./ui/Card";
import { TextInput } from "./ui/TextInput";
import { PasswordInput } from "./ui/PasswordInput";
import { DatePicker } from "./ui/DatePicker";
import { Button } from "./ui/Button";
import { RegisterFormData } from "@/types/RegisterFormData";
import { IconUserPlus } from "@tabler/icons-react";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { Loader } from "./ui/Loader";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  onSwitch: () => void;
  isLoading?: boolean;
}

export function RegisterForm(props: RegisterFormProps) {
  const t = useTranslations("Form");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState<Date>(new Date());

  const [errorName, setErrorName] = useState("");
  const [errorSurname, setErrorSurname] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorBirthday, setErrorBirthday] = useState("");

  const minAge = 13;

  const schema = yup.object({
    name: yup.string().required(t("error.name-required")),
    surname: yup.string().required(t("error.surname-required")),
    password: yup
      .string()
      .required(t("error.password-required"))
      .test("same-pwd", t("error.password-same-pw"), (val) => val === confirmPw)
      .min(8, t("error.password-too-short")),
    email: yup
      .string()
      .required(t("error.email-required"))
      .email(t("error.email-email")),
    birthday: yup
      .date()
      .required(t("error.birthday-min-age"))
      .test("min-age", t("error.birthday-min-age"), (val) => {
        const curDate = new Date();
        curDate.setFullYear(curDate.getFullYear() - minAge);
        return val < curDate;
      }),
  });

  const onSubmit = (e: FormEvent) => {
    const data: RegisterFormData = { name, surname, password, email, birthday };
    e.preventDefault();
    schema
      .validate(data, { abortEarly: false })
      .then(props.onSubmit)
      .catch((err: yup.ValidationError) => {
        err.inner.forEach((error) => {
          switch (error.path) {
            case "name":
              setErrorName(error.message);
              break;
            case "surname":
              setErrorSurname(error.message);
              break;
            case "email":
              setErrorEmail(error.message);
              break;
            case "password":
              setErrorPassword(error.message);
              break;
            case "birthday":
              setErrorBirthday(error.message);
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
          <div>
            <h2 className="text-3xl font-bold">{t("register")}</h2>
          </div>
          <div className="space-y-2">
            <div className="space-x-2 flex">
              <TextInput
                value={name}
                onChange={(str) => onChange(str, setName, setErrorName)}
                label={t("name")}
                placeholder={t("name-holder")}
                error={errorName}
                disabled={props.isLoading}
              />
              <TextInput
                value={surname}
                onChange={(str) => onChange(str, setSurname, setErrorSurname)}
                label={t("surname")}
                placeholder={t("surname-holder")}
                error={errorSurname}
                disabled={props.isLoading}
              />
            </div>
            <TextInput
              value={email}
              onChange={(str) => onChange(str, setEmail, setErrorEmail)}
              label={t("email")}
              placeholder={t("email-holder")}
              error={errorEmail}
              disabled={props.isLoading}
            />
            <PasswordInput
              value={password}
              onChange={(str) => onChange(str, setPassword, setErrorPassword)}
              label={t("password")}
              error={errorPassword}
              disabled={props.isLoading}
            />
            <PasswordInput
              value={confirmPw}
              onChange={setConfirmPw}
              label={t("confirm-password")}
              disabled={props.isLoading}
            />
            <DatePicker
              date={birthday}
              onChange={(date) => onChange(date, setBirthday, setErrorBirthday)}
              label={t("birthday")}
              error={errorBirthday}
              disabled={props.isLoading}
            />
          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <Button
                type="button"
                label={t("switch-to-login")}
                onClick={props.onSwitch}
                secondary
                disabled={props.isLoading}
              />
            </div>
            <Button
              type="submit"
              label={t("register")}
              disabled={props.isLoading}
              icon={
                <Loader isLoading={props.isLoading}>
                  <IconUserPlus />
                </Loader>
              }
            />
          </div>
        </div>
      </Card>
    </motion.form>
  );
}
