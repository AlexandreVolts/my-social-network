import { useTranslations } from "next-intl";
import { Modal } from "./ui/Modal";
import { TextArea } from "./ui/TextArea";
import { Button } from "./ui/Button";
import { IconSend } from "@tabler/icons-react";
import { Loader } from "./ui/Loader";
import { FormEvent, useEffect, useState } from "react";

interface PublishModalProps {
  opened: boolean;
  isLoading: boolean;
  title: string;
  defaultValue?: string;
  onClose: () => void;
  onPublish: (value: string) => void;
}
export function PublishModal(props: PublishModalProps) {
  const [value, setValue] = useState("");
  const t = useTranslations("Home");

  const onPublish = (e: FormEvent) => {
    e.preventDefault();
    props.onPublish(value);
    props.onClose();
  };

  useEffect(() => {
    setValue(props.defaultValue ?? "");
  }, [props.opened, props.defaultValue]);

  return (
    <Modal
      title={props.title}
      opened={props.opened}
      onClose={props.onClose}
      closeOnClickOutside
    >
      <form className="flex flex-col space-y-2" onSubmit={onPublish}>
        <TextArea
          label=""
          placeholder={t("publish-placeholder")}
          value={value}
          onChange={setValue}
          disabled={props.isLoading}
        />
        <div className="flex justify-end">
        <Button
          type="submit"
          label={t("publish")}
          size="lg"
          disabled={props.isLoading}
          icon={
            <Loader isLoading={props.isLoading}>
              <IconSend />
            </Loader>
          }
        />
        </div>
      </form>
    </Modal>
  );
}
