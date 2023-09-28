import { IconMessage, IconShare } from "@tabler/icons-react";
import { Card } from "./ui/Card";
import { Avatar } from "./ui/Avatar";
import { ActionIcon } from "./ui/ActionIcon";
import { ReadMoreText } from "./ui/ReadMoreText";
import { useElapsedDelayFormat } from "@/hooks/useElapsedDelayFormat";
import { BasePublishedContentProps } from "@/types/BasePublishedContentProps";
import { Button } from "./ui/Button";
import { LikeIcon } from "./ui/LikeIcon";
import { TextArea } from "./ui/TextArea";
import { UpdateContentDropdown } from "./UpdateContentDropdown";
import { Children, FormEvent, ReactNode, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface PostCardProps extends BasePublishedContentProps {
  isAuthor?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}
export function PostCard(props: PostCardProps) {
  const t = useTranslations();
  const formater = useElapsedDelayFormat();
  const [isCommentOpened, setIsCommentOpened] = useState(false);
  const [commentText, setCommentText] = useState("");

  const header = props.isAuthor ? "justify-between" : "";

  const onComment = (e: FormEvent) => {
    e.preventDefault();
    props.onComment(commentText);
  };

  // TODO: set the delete modal in a separated file.
  return (
    <>
      <div className="w-full space-y-4">
        <Card>
          <div className="space-y-2">
            <div className={`flex ${header} space-x-2 w-full`}>
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
              {props.isAuthor ? <UpdateContentDropdown {...props} /> : <></>}
            </div>
            <ReadMoreText text={props.text} charLimit={props.charLimit} />
            <div className="grid grid-cols-3">
              <div className="flex items-center space-x-2">
                <ActionIcon onClick={props.onLike}>
                  <LikeIcon isLiked={props.isLiked} />
                </ActionIcon>
                <p className={props.isLiked ? "text-red-500" : "text-black"}>
                  {props.likeCount}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <ActionIcon
                  onClick={() => setIsCommentOpened(!isCommentOpened)}
                >
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
        {isCommentOpened ? (
          <div className="pl-8 space-y-2">
            <div className="w-full">{props.children}</div>
            <form className="flex flex-col space-y-2" onSubmit={onComment}>
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
