import {
  IconDots,
  IconHeart,
  IconMessage,
  IconShare,
} from "@tabler/icons-react";
import { Card } from "./ui/Card";
import { useState } from "react";
import { Avatar } from "./ui/Avatar";
import { ActionIcon } from "./ui/ActionIcon";
import { useElapsedDelayFormat } from "@/hooks/useElapsedDelayFormat";

interface PostCardProps {
  name: string;
  surname: string;
  avatarSrc?: string;
  avatarColor?: string;
  createdAt: Date;
  likeCount: number;
  commentCount: number;
  text: string;
  charLimit?: number;
  isAuthor?: boolean;
  onSettingClick: () => void;
  onLikeClick: () => void;
  onCommentClick: () => void;
  onShareClick: () => void;
}

export function PostCard(props: PostCardProps) {
  const formater = useElapsedDelayFormat();
  const [isFullyDisplayed, setIsFullyDisplayed] = useState(false);
  const isTextOverflow = props.text.length >= (props.charLimit ?? 250);

  const justifyHeader = props.isAuthor ? "justify-between" : "";

  return (
    <Card>
      <div className="w-96 space-y-2">
        <div className={`flex items-center ${justifyHeader} space-x-2 w-full`}>
          <div className="flex items-center space-x-2">
            <Avatar
              src={props.avatarSrc}
              color={props.avatarColor}
              name={props.name}
              surname={props.surname}
            />
            <div className="flex-col">
              <h5 className="font-bold">
                {props.name} {props.surname}
              </h5>
              <p>{formater(props.createdAt)}</p>
            </div>
          </div>
          {props.isAuthor ? (
            <ActionIcon onClick={props.onSettingClick}>
              <IconDots />
            </ActionIcon>
          ) : (
            <></>
          )}
        </div>
        <p>
          <span className={`break-all`}>
            {isFullyDisplayed
              ? props.text
              : props.text.slice(0, props.charLimit ?? 250) +
                (isTextOverflow ? "... " : " ")}
          </span>
          {isTextOverflow ? (
            !isFullyDisplayed ? (
              <span
                onClick={() => setIsFullyDisplayed(true)}
                className="cursor-pointer font-bold"
              >
                En voir plus
              </span>
            ) : (
              <span
                onClick={() => setIsFullyDisplayed(false)}
                className="cursor-pointer font-bold"
              >
                En voir moins
              </span>
            )
          ) : (
            <></>
          )}
        </p>
        <div className="grid grid-cols-3">
          <div className="flex items-center space-x-2">
            <ActionIcon onClick={props.onLikeClick}>
              <IconHeart />
            </ActionIcon>
            <p>{props.likeCount}</p>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <ActionIcon onClick={props.onCommentClick}>
              <IconMessage />
            </ActionIcon>
            <p>{props.commentCount}</p>
          </div>
          <div className="flex justify-end">
            <ActionIcon onClick={props.onShareClick}>
              <IconShare />
            </ActionIcon>
          </div>
        </div>
      </div>
    </Card>
  );
}
