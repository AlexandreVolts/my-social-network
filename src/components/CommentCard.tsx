import { Card } from "./ui/Card";
import { Avatar } from "./ui/Avatar";
import { ActionIcon } from "./ui/ActionIcon";
import { ReadMoreText } from "./ui/ReadMoreText";
import { LikeIcon } from "./ui/LikeIcon";
import { useElapsedDelayFormat } from "@/hooks/useElapsedDelayFormat";
import { BasePublishedContentProps } from "@/types/BasePublishedContentProps";
import { IconMessage, IconShare } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { UpdateContentDropdown } from "./UpdateContentDropdown";

interface CommentCardProps extends BasePublishedContentProps {
  isAdmin?: boolean;
  isAuthor?: boolean;
}
export function CommentCard(props: CommentCardProps) {
  const formater = useElapsedDelayFormat();

  return (
    <motion.div className="flex space-x-2">
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
            <LikeIcon isLiked={props.isLiked} />
          </ActionIcon>
          <span className={props.isLiked ? "text-red-500" : "text-black"}>
            {props.likeCount}
          </span>
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
      {props.isAuthor || props.isAdmin ? (
        <UpdateContentDropdown {...props} />
      ) : (
        <></>
      )}
    </motion.div>
  );
}
