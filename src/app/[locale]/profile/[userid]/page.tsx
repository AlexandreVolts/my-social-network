"use client";

import { CommentCard } from "@/components/CommentCard";
import { Header } from "@/components/Header";
import { LabelledNumber } from "@/components/LabelledNumber";
import { PostCard } from "@/components/PostCard";
import { UserListModal } from "@/components/UserListModal";
import { ActionIcon } from "@/components/ui/ActionIcon";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { Tooltip } from "@/components/ui/Tooltip";
import { useRestQuery } from "@/hooks/useRestQuery";
import { useUser } from "@/hooks/useUser";
import { UserData } from "@/types/UserData";
import {
  getLike,
  getAllFollows,
  getLikes,
  getUserInfos,
  getPosts,
} from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  IconHeart,
  IconHeartFilled,
  IconMail,
  IconPencil,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Profile() {
  const params = useParams();
  const supabase = createClientComponentClient();
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();
  const t = useTranslations("Profile");
  const userFetch = use(getUserInfos(supabase, params.userid as string));
  const [userData, setUserData] = useState<UserData>();
  const [isAuthor, setIsAuthor] = useState(true);
  const [isFollowed, setIsFollowed] = useState<boolean>();
  const [isFollowsOpened, setIsFollowsOpened] = useState(false);
  const [isFollowersOpened, setIsFollowersOpened] = useState(false);
  const { data: follows, handlers: followsHandlers } = useRestQuery(
    supabase,
    "follows",
    () => getAllFollows(supabase)
  );
  const { data: posts, handlers: postsHandlers } = useRestQuery(
    supabase,
    "posts",
    () => getPosts(supabase)
  );
  const { data: likes, handlers: likeHandlers } = useRestQuery(
    supabase,
    "post_likes",
    () => getLikes(supabase)
  );

  const followList = follows.data?.filter(
    (follow) => follow.follower.id === userData?.id
  );
  const followerList = follows.data?.filter(
    (follow) => follow.target.id === userData?.id
  );

  const onFollowClick = () => {
    followsHandlers[isFollowed ? "delete" : "create"]({
      follower: user?.id,
      target: userData?.id,
    });
  };

  const onLike = async (postId: string) => {
    const data = await getLike(supabase, user!.id, postId);

    if (data.error) return;
    likeHandlers[data.data?.length ? "delete" : "create"]({
      post_id: postId,
      user_id: user!.id,
    });
  };

  //update isFollowed
  useEffect(() => {
    setIsFollowed(
      !!follows.data?.some(
        (follow) =>
          follow.follower.id === user?.id && follow.target.id === userData?.id
      )
    );
  }, [follows, userData, user]);

  //fetch handling and redirection
  useEffect(() => {
    if (!userData && isComplete) {
      if (userFetch.data) {
        setUserData(userFetch.data[0]);
        setIsAuthor(userFetch.data[0].id === user?.id);
      } else {
        if (user?.id) {
          router.push(`/profile/${user.id}`);
          return;
        }
        router.push("/");
      }
    }
  }, [userFetch, userData, isComplete, router, user]);

  return (
    <>
      <UserListModal
        opened={isFollowsOpened}
        onClose={() => setIsFollowsOpened(false)}
        title={userData?.name + " " + userData?.surname + t("follows-modal")}
        list={followList?.map((follow) => follow.target)}
      />
      <UserListModal
        opened={isFollowersOpened}
        onClose={() => setIsFollowersOpened(false)}
        title={t("followers-modal") + userData?.name + " " + userData?.surname}
        list={followerList?.map((follow) => follow.follower)}
      />
      <Header userId={user?.id} />
      <main className="flex flex-col items-center justify-between p-24">
        <div className="flex lg:flex-row flex-col space-x-4 w-full">
          <div className="flex flex-col w-full lg:w-1/2 min-w-max">
            <div className="flex flex-col lg:flex-row items-center">
              <div>
                <Avatar
                  name={userData?.name ?? ""}
                  surname={userData?.surname ?? ""}
                  src={userData?.avatar_src}
                  size="lg"
                />
                <h2 className="text-center font-bold text-3xl">
                  {userData?.name} {userData?.surname}
                </h2>
              </div>
              <div className="flex grow grid grid-cols-3 w-full p-2">
                <div>
                  <LabelledNumber
                    value={posts.data?.length}
                    label={t("posts")}
                  />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setIsFollowsOpened(true)}
                >
                  <LabelledNumber
                    value={followList?.length}
                    label={t("follows")}
                  />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setIsFollowersOpened(true)}
                >
                  <LabelledNumber
                    value={followerList?.length}
                    label={t("followers")}
                  />
                </div>
              </div>
            </div>
            {/*@ts-ignore*/}
            <p>{(t("birthdate"), userData?.birthday)}</p>
            <p>{t("adress") + userData?.adress}</p>
            {!isAuthor ? (
              <div className="flex w-full space-x-2">
                <Tooltip label={isFollowed ? t("unfollow") : t("follow")}>
                  <Button
                    onClick={onFollowClick}
                    label=""
                    secondary={isFollowed}
                    icon={isFollowed ? <IconHeartFilled /> : <IconHeart />}
                  />
                </Tooltip>
                <Tooltip label={t("message")}>
                  <Button
                    label={t("message")}
                    icon={<IconMail />}
                    secondary
                    onClick={() => console.log(followList, followerList)}
                  />
                </Tooltip>
              </div>
            ) : (
              <></>
            )}
            <div>
              {isAuthor ? (
                userData?.description ? (
                  <div>
                    <p>{userData.description}</p>
                    <ActionIcon>
                      <IconPencil />
                    </ActionIcon>
                  </div>
                ) : (
                  <div>
                    <TextArea
                      value=""
                      onChange={() => {}}
                      label={t("description-label")}
                      placeholder={t("description-placeholder")}
                    />
                  </div>
                )
              ) : (
                <p>{userData?.description}</p>
              )}
            </div>
            <p className="italic">
              {t("joined-on")}
              {new Date(userData?.created_at ?? 0).toLocaleDateString()}
            </p>
          </div>
          <div className="w-full space-y-2">
            {posts.data?.filter((post) => !post.answer_to && post.users.id === params.userid).map((post) => {
              if (!userData) {
                return <></>;
              }
              return (
                <PostCard
                  key={post.id}
                  name={userData.name}
                  surname={userData.surname}
                  likeCount={
                    likes?.data?.filter((like) => like.post_id === post.id)
                      .length ?? 0
                  }
                  isLiked={
                    !!likes?.data?.find(
                      (like) =>
                        like.post_id === post.id && like.user_id === user?.id
                    )
                  }
                  createdAt={new Date(post.created_at)}
                  updatedAt={new Date(post.updated_at)}
                  userId={params.userid as string}
                  text={post.content}
                  isLoading={false}
                  onClick={() => {}}
                  onComment={() => {}}
                  onDelete={() => postsHandlers.delete({ id: post.id })}
                  onEdit={(content) =>
                    postsHandlers.update({ id: post.id }, { content })
                  }
                  onLike={() => onLike(post.id)}
                  onShare={() => {}}
                  isAuthor
                >
                  {posts?.data
                    ?.filter((comment) => comment.answer_to === post.id)
                    .map((comment) => {
                      return (
                        <CommentCard
                          key={comment.id}
                          name={comment.users.name}
                          surname={comment.users.surname}
                          createdAt={new Date(comment.created_at)}
                          updatedAt={new Date(comment.updated_at)}
                          userId={comment.users.id}
                          text={comment.content}
                          likeCount={0}
                          isLiked={false}
                          onComment={() => {}}
                          onDelete={() => {}}
                          onEdit={() => {}}
                          onLike={() => {}}
                          onShare={() => {}}
                        />
                      );
                    })}
                </PostCard>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
