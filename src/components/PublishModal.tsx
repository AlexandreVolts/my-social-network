import { useTranslations } from "next-intl";
import { Modal } from "./ui/Modal";
import { TextArea } from "./ui/TextArea";
import { Button } from "./ui/Button";
import { IconSend } from "@tabler/icons-react";
import { Loader } from "./ui/Loader";
import { FormEvent } from "react";

interface PublishModalProps {
  opened: boolean;
  isLoading: boolean;
  value: string;
  onClose: () => void;
  onChange: (value: string) => void;
  onPublish: () => void;
}
export function PublishModal(props: PublishModalProps) {
  const t = useTranslations("Home");

  const onPublish = (e: FormEvent) => {
    e.preventDefault();
    props.onPublish();
  };
  return (
    <Modal
      title={t("publish-modal-title")}
      opened={props.opened}
      onClose={props.onClose}
      closeOnClickOutside
    >
      <form className="flex flex-col space-y-2" onSubmit={onPublish}>
        <TextArea
          label=""
          placeholder={t("publish-placeholder")}
          value={props.value}
          onChange={props.onChange}
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
