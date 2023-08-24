import {
  IconDots,
  IconHeart,
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
import { Children, ReactNode, useState } from "react";

interface PostCardProps extends BasePublishedContentProps {
  isAuthor?: boolean;
  isOpened?: boolean;
  children: ReactNode;
  onSetting: () => void;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function PostCard(props: PostCardProps) {
  const [isAuthorMenuOpened, setIsAuthorMenuOpened] = useState(false);
  const formater = useElapsedDelayFormat();

  const justifyHeader = props.isAuthor ? "justify-between" : "";
  const comments = props.isOpened ? "" : "hidden";

  return (
    <div className="w-full space-y-4">
      <Card>
        <div className={` space-y-2`}>
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
            <Dropdown
              opened={isAuthorMenuOpened}
              onOpen={() => setIsAuthorMenuOpened(true)}
              onClose={() => setIsAuthorMenuOpened(false)}
              target={
                <ActionIcon onClick={props.onSetting}>
                  <IconDots />
                </ActionIcon>
              }
            >
              <Dropdown.Item onClick={props.onEdit}>
                <IconPencil className="text-blue-600" />
                <span>Editer</span>
              </Dropdown.Item>
              <Dropdown.Item onClick={props.onDelete}>
                <IconTrash className="text-red-600" />
                <span>Supprimer</span>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <></>
          )}
          </div>
          <ReadMoreText text={props.text} charLimit={props.charLimit} />
          <div className="grid grid-cols-3">
            <div className="flex items-center space-x-2">
              <ActionIcon onClick={props.onLike}>
                <IconHeart />
              </ActionIcon>
              <p>{props.likeCount}</p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <ActionIcon onClick={props.onComment}>
                <IconMessage />
              </ActionIcon>
              <p>{Children.count(props.children)}</p>
            </div>
            <div className="flex justify-end">
              <ActionIcon onClick={props.onShare}>
                <IconShare />
              </ActionIcon>
            </div>
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
