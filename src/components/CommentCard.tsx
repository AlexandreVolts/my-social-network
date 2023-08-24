import { BasePublishedContentProps } from "@/types/BasePublishedContentProps";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { Avatar } from "./ui/Avatar";
import { ActionIcon } from "./ui/ActionIcon";
import { IconDots, IconHeart, IconMessage, IconShadow, IconShare } from "@tabler/icons-react";
import { ReadMoreText } from "./ui/ReadMoreText";
import { useElapsedDelayFormat } from "@/hooks/useElapsedDelayFormat";

interface CommentCardProps extends BasePublishedContentProps {
  isAdmin?: boolean;
  isAuthor?: boolean;
  onSettingClick: () => void;
  onLikeClick: () => void;
  onCommentClick: () => void;
  onShareClick: () => void;
}

export function CommentCard(props: CommentCardProps) {
  const getPublishedTime = useElapsedDelayFormat();

  return (
    <motion.div className="flex space-x-2">
      <div className="flex flex-col justify-start">
        <Avatar
          src={props.avatarSrc}
          name={props.name}
          surname={props.surname}
          color={props.avatarColor}
          size="sm"
        />
        <div className="flex flex-col items-center">
          <ActionIcon onClick={props.onLikeClick}>
            <IconHeart />
          </ActionIcon>
          <span>{props.likeCount}</span>
        </div>
      </div>
      <div className="w-80">
        <Card>
          <b>
            {props.name} {props.surname}
          </b>
          <ReadMoreText text={props.text} charLimit={props.charLimit} />
        </Card>
        <div className="flex justify-between">
          <span
            onClick={props.onCommentClick}
            className="flex hover:text-gray-300 cursor-pointer"
          >
            <IconMessage />
            Comment
          </span>
          <span
            onClick={props.onShareClick}
            className="flex hover:text-gray-300 cursor-pointer"
          >
            <IconShare />
            Share
          </span>
          <span className="">{getPublishedTime(props.createdAt)}</span>
        </div>
      </div>
      <div className="flex-col justify-start">
        <ActionIcon onClick={props.onSettingClick}>
          <IconDots />
        </ActionIcon>
      </div>
    </motion.div>
  );
}
