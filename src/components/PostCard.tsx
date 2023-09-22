import {
  IconDots,
  IconMessage,
  IconPencil,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";
import { Card } from "./ui/Card";
import { Avatar } from "./ui/Avatar";
import { ActionIcon } from "./ui/ActionIcon";
import { Dropdown } from "./ui/Dropdown";
import { ReadMoreText } from "./ui/ReadMoreText";
import { useElapsedDelayFormat } from "@/hooks/useElapsedDelayFormat";
import { BasePublishedContentProps } from "@/types/BasePublishedContentProps";
import { Children, MouseEvent, ReactNode, useState } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { LikeIcon } from "./ui/LikeIcon";
import { PublishModal } from "./PublishModal";
import Link from "next/link";
import { TextArea } from "./ui/TextArea";

interface PostCardProps extends BasePublishedContentProps {
  isAuthor?: boolean;
  isLoading: boolean;
  children: ReactNode;
  onClick: () => void;
}
export function PostCard(props: PostCardProps) {
  const t = useTranslations();
  const formater = useElapsedDelayFormat();
  const [isAuthorMenuOpened, setIsAuthorMenuOpened] = useState(false);
  const [isCommentOpened, setIsCommentOpened] = useState(false);
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);
  const [isEditOpened, setIsEditOpened] = useState(false);
  const [editText, setEditText] = useState("");
  const [commentText, setCommentText] = useState("");

  const header = props.isAuthor ? "justify-between" : "";

  const cancelEvent = (e: MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };
  const onDelete = () => {
    setIsDeleteOpened(false);
    props.onDelete();
  };
  const onEdit = () => {
    setIsEditOpened(false);
    props.onEdit(editText);
  };
  const openEditModal = () => {
    setIsEditOpened(true);
    setEditText(props.text);
  };

  // TODO: set the delete modal in a separated file.
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
        value={editText}
        title={t("Home.edit-modal-title")}
        onClose={() => setIsEditOpened(false)}
        onChange={setEditText}
        onPublish={onEdit}
      />
      <div onClick={props.onClick} className="w-full space-y-4">
        <Card>
          <div className="space-y-2">
            <div
              className={`flex items-center ${header} space-x-2 w-full`}
            >
              <div className="flex items-center space-x-2">
                <Avatar
                  src={props.avatarSrc}
                  color={props.avatarColor}
                  name={props.name}
                  surname={props.surname}
                />
                <div className="flex-col">
                  <h5 className="font-bold">
                    <Link href={`/profile/${props.userId}`}>
                      {props.name} {props.surname}
                    </Link>
                  </h5>
                  <p className="text-gray-500">
                    <span>{formater(props.createdAt)} </span>
                    {props.createdAt.getTime() !== props.updatedAt.getTime() ? (
                      <span className="italic">
                        ({t("Utils.edited")} {formater(props.updatedAt)})
                      </span>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
              {props.isAuthor ? (
                <Dropdown
                  opened={isAuthorMenuOpened}
                  onOpen={() => setIsAuthorMenuOpened(true)}
                  onClose={() => setIsAuthorMenuOpened(false)}
                  stopPropagation
                  target={
                    <ActionIcon>
                      <IconDots />
                    </ActionIcon>
                  }
                >
                  <Dropdown.Item onClick={openEditModal}>
                    <IconPencil className="text-blue-600" />
                    <span>{t("Utils.edit")}</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setIsDeleteOpened(true)}>
                    <IconTrash className="text-red-600" />
                    <span>{t("Utils.delete")}</span>
                  </Dropdown.Item>
                </Dropdown>
              ) : (
                <></>
              )}
            </div>
            <ReadMoreText text={props.text} charLimit={props.charLimit} />
            <div className="grid grid-cols-3">
              <div className="flex items-center space-x-2">
                <ActionIcon onClick={(e) => cancelEvent(e, props.onLike)}>
                  <LikeIcon isLiked={props.isLiked} />
                </ActionIcon>
                <p className={props.isLiked ? "text-red-500" : "text-black"}>
                  {props.likeCount}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <ActionIcon
                  onClick={(e) =>
                    cancelEvent(e, () => setIsCommentOpened(!isCommentOpened))
                  }
                >
                  <IconMessage />
                </ActionIcon>
                <p>{Children.count(props.children)}</p>
              </div>
              <div className="flex justify-end">
                <ActionIcon onClick={(e) => cancelEvent(e, props.onShare)}>
                  <IconShare />
                </ActionIcon>
              </div>
            </div>
          </div>
        </Card>
        {isCommentOpened ? (
          <div className="pl-8 space-y-2">
            <div className="w-full">{props.children}</div>
            <form className="flex flex-col space-y-2" onSubmit={() => props.onComment(commentText)}>
              <TextArea
                label=""
                placeholder="Tell your thoughts!"
                value={commentText}
                onChange={setCommentText}
              />
              <div className="flex justify-end">
                <Button label="Publish comment" type="submit" />
              </div>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
