import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react";
import { ActionIcon } from "./ui/ActionIcon";
import { Dropdown } from "./ui/Dropdown";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PublishModal } from "./PublishModal";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";

interface UpdateContentDropdownProps {
  text: string;
  isAdmin?: boolean;
  isLoading?: boolean;
  onEdit: (content: string) => void;
  onDelete: () => void;
}
export function UpdateContentDropdown(props: UpdateContentDropdownProps) {
  const t = useTranslations();
  const [isAuthorMenuOpened, setIsAuthorMenuOpened] = useState(false);
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);
  const [isEditOpened, setIsEditOpened] = useState(false);

  const onDelete = () => {
    setIsDeleteOpened(false);
    props.onDelete();
  };

  return (
    <>
      <Modal
        opened={isDeleteOpened}
        onClose={() => setIsDeleteOpened(false)}
        title={t("Post.on-delete")}
      >
        <div className="flex justify-around">
          <Button
            label={t("Utils.cancel")}
            secondary
            onClick={() => setIsDeleteOpened(false)}
            disabled={props.isLoading}
          />
          <Button
            label={t("Utils.proceed")}
            onClick={onDelete}
            disabled={props.isLoading}
          />
        </div>
      </Modal>
      <PublishModal
        opened={isEditOpened}
        isLoading={props.isLoading}
        title={t("Home.edit-modal-title")}
        defaultValue={props.text}
        onClose={() => setIsEditOpened(false)}
        onPublish={props.onEdit}
      />
      <Dropdown
        opened={isAuthorMenuOpened}
        onOpen={() => setIsAuthorMenuOpened(true)}
        onClose={() => setIsAuthorMenuOpened(false)}
        target={
          <ActionIcon>
            <IconDots />
          </ActionIcon>
        }
      >
        {!props.isAdmin ? (
          <Dropdown.Item onClick={() => setIsEditOpened(true)}>
            <IconPencil className="text-blue-600" />
            <span>{t("Utils.edit")}</span>
          </Dropdown.Item>
        ) : (
          <></>
        )}
        <Dropdown.Item onClick={() => setIsDeleteOpened(true)}>
          <IconTrash className="text-red-600" />
          <span>{t("Utils.delete")}</span>
        </Dropdown.Item>
      </Dropdown>
    </>
  );
}
