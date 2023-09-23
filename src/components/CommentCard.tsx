import { Card } from "./ui/Card";
import { Avatar } from "./ui/Avatar";
import { ActionIcon } from "./ui/ActionIcon";
import { ReadMoreText } from "./ui/ReadMoreText";
import { Dropdown } from "./ui/Dropdown";
import { useElapsedDelayFormat } from "@/hooks/useElapsedDelayFormat";
import { BasePublishedContentProps } from "@/types/BasePublishedContentProps";
import {
  IconDots,
  IconHeart,
  IconMessage,
  IconPencil,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface CommentCardProps extends BasePublishedContentProps {
  isAdmin?: boolean;
  isAuthor?: boolean;
}

export function CommentCard(props: CommentCardProps) {
  const formater = useElapsedDelayFormat();
  const t = useTranslations("Utils");
  const [isAuthorMenuOpened, setIsAuthorMenuOpened] = useState(false);

  return (
    <motion.div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col">
        <Avatar
          src={props.avatarSrc}
          name={props.name}
          surname={props.surname}
          color={props.avatarColor}
          size="sm"
        />
        <div className="flex flex-col items-center">
          <ActionIcon onClick={props.onLike}>
            <IconHeart />
          </ActionIcon>
          <span>{props.likeCount}</span>
        </div>
      </div>
      <div className="grow">
        <Card>
          <b>
            {props.name} {props.surname}
          </b>
          <ReadMoreText text={props.text} charLimit={props.charLimit} />
        </Card>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 items-center">
            <ActionIcon onClick={() => {}}>
              <IconMessage />
            </ActionIcon>
            <span>{0}</span>
          </div>
          <ActionIcon onClick={props.onShare}>
            <IconShare />
          </ActionIcon>
          <span>{formater(props.createdAt)}</span>
        </div>
      </div>
      <div>
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
          <Dropdown.Item onClick={() => props.onEdit("")}>
            <IconPencil className="text-blue-600" />
            <span>{t("edit")}</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={props.onDelete}>
            <IconTrash className="text-red-600" />
            <span>{t("delete")}</span>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </motion.div>
  );
}
