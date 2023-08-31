"use client";

import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { ActionIcon } from "@/components/ui/ActionIcon";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TextArea } from "@/components/ui/TextArea";
import { Tooltip } from "@/components/ui/Tooltip";
import { useRestQuery } from "@/hooks/useRestQuery";
import { useUser } from "@/hooks/useUser";
import { PostProps } from "@/types/PostProps";
import { UserData } from "@/types/UserData";
import { getAllFollows, getUserInfos, getUserPosts } from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IconHeart, IconHeartFilled, IconPencil } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
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
  const [userPosts, setUserPosts] = useState<PostProps[] | null>(null);
  const [isAuthor, setIsAuthor] = useState<boolean>();
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [isFollowsOpened, setIsFollowsOpened] = useState(false);
  const [isFollowersOpened, setIsFollowersOpened] = useState(false);
  const { data: follows, handlers: followsHandlers } = useRestQuery(
    supabase,
    "follows",
    () => getAllFollows(supabase)
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

  //update isFollowed
  useEffect(() => {
    setIsFollowed(
      follows.data?.find(
        (follow) =>
          follow.follower.id === user?.id && follow.target.id === userData?.id
      )
        ? true
        : false
    );
  }, [follows]);

  //fetch handling and redirection
  useEffect(() => {
    if (!userData && isComplete) {
      if (userFetch.data) {
        setUserData(userFetch.data[0]);
        setIsAuthor(userFetch.data[0].id === user!.id);
      } else {
        if (user?.id) {
          router.push(`/profile/${user.id}`);
          return;
        }
        router.push("/");
      }
    }
  }, [userFetch, userData, isComplete]);

  //fetch post data
  useEffect(() => {
    if (userData && !userPosts) {
      getUserPosts(supabase, userData.id).then((data) =>
        setUserPosts(data.data)
      );
    }
  }, [userData, userPosts]);

  return (
    <>
      <Modal
        opened={isFollowsOpened}
        onClose={() => setIsFollowsOpened(false)}
        title={userData?.name + " " + userData?.surname + ` follows them`}
        closeOnClickOutside
      >
        <ul className="space-y-2">
          {followList?.map((user, index) => {
            const follow = user.target;
            return (
              <li key={index} className="flex justify-between">
                <p className="font-bold">{follow.name + " " + follow.surname}</p>
                <Link href={`/profile/${follow.id}`} className="italic hover:underline">See profile</Link>
              </li>
            );
          })}
        </ul>
      </Modal>
      <Modal
        opened={isFollowersOpened}
        onClose={() => setIsFollowersOpened(false)}
        title={`They follow ` + userData?.name + " " + userData?.surname}
        closeOnClickOutside
      >
        <ul className="space-y-2">
          {followerList?.map((user, index) => {
            const follower = user.follower;
            return (
              <li key={index} className="flex justify-between">
                <p className="font-bold">{follower.name + " " + follower.surname}</p>
                <Link href={`/profile/${follower.id}`} className="italic hover:underline">See profile</Link>
              </li>
            );
          })}
        </ul>
      </Modal>

      <Header isLoggedIn />
      <main className="flex flex-col items-center justify-between p-24">
        <div className="flex sm:flex-row flex-col space-x-4 w-full">
          <div className="flex flex-col w-full sm:w-1/2">
            <Avatar
              name={userData?.name ?? ""}
              surname={userData?.surname ?? ""}
              src={userData?.avatar_src}
              size="lg"
            />
            <div>
              <h2 className="font-bold text-3xl">
                {userData?.name} {userData?.surname}
              </h2>
              {/*@ts-ignore*/}
              <p>{(t("birthdate"), userData?.birthday)}</p>
              <p>{t("adress") + userData?.adress}</p>
            </div>
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
                  secondary
                  onClick={() => console.log(followList, followerList)}
                />
              </Tooltip>
              <Tooltip label={t("email")}>
                <Button label={t("email")} secondary />
              </Tooltip>
            </div>
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
            <p className="font-bold">Posts : {userPosts?.length}</p>
            <p
              onClick={() => setIsFollowsOpened(true)}
              className="font-bold cursor-pointer"
            >
              Follows : {followList?.length}
            </p>
            <p
              onClick={() => setIsFollowersOpened(true)}
              className="font-bold cursor-pointer"
            >
              Followers : {followerList?.length}
            </p>
          </div>
          <div className="w-full space-y-2">
            {userPosts?.map((post, index) => {
              if (userData) {
                return (
                  <PostCard
                    key={index}
                    name={userData.name}
                    surname={userData.surname}
                    likeCount={0}
                    isLiked={false}
                    createdAt={new Date(post.created_at)}
                    text={post.content}
                    isLoading={false}
                    updatedAt={new Date(post.updated_at)}
                    onClick={() => {}}
                    onComment={() => {}}
                    onDelete={() => {}}
                    onEdit={() => {}}
                    onLike={() => {}}
                    onShare={() => {}}
                  >
                    <></>
                  </PostCard>
                );
              }
            })}
          </div>
        </div>
      </main>
    </>
  );
}
