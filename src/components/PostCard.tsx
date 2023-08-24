import {
  IconDots,
  IconHeart,
  IconMessage,
  IconShare,
} from "@tabler/icons-react";
import { Card } from "./ui/Card";
import { Avatar } from "./ui/Avatar";
import { ActionIcon } from "./ui/ActionIcon";
import { useElapsedDelayFormat } from "@/hooks/useElapsedDelayFormat";
import { ReadMoreText } from "./ui/ReadMoreText";
import { BasePublishedContentProps } from "@/types/BasePublishedContentProps";
import React, { ReactNode } from "react";
import { CommentCard } from "./CommentCard";

interface PostCardProps extends BasePublishedContentProps {
  isAuthor?: boolean;
  isOpened?: boolean;
  children: ReactNode;
  onSettingClick: () => void;
  onLikeClick: () => void;
  onCommentClick: () => void;
  onShareClick: () => void;
}

export function PostCard(props: PostCardProps) {
  const formater = useElapsedDelayFormat();

  const justifyHeader = props.isAuthor ? "justify-between" : "";
  const comments = props.isOpened ? "" : "hidden";

  return (
    <div className="w-full space-y-4">
      <Card>
        <div className="w-96 space-y-2">
          <div
            className={`flex items-center ${justifyHeader} space-x-2 w-full`}
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
              <p>{React.Children.count(props.children)}</p>
            </div>
            <div className="flex justify-end">
              <ActionIcon onClick={props.onShareClick}>
                <IconShare />
              </ActionIcon>
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
        <ReadMoreText text={props.text} charLimit={props.charLimit} />
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
      </Card>
      <div className={`flex ${comments}`}>
        <div className="w-20"></div>
        <div className="w-full">{props.children}</div>
      </div>
    </div>
  );
}
