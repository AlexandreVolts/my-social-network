"use client";

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
import { PostProps } from "@/types/PostProps";
import { UserData } from "@/types/UserData";
import { getAllFollows, getUserInfos, getUserPosts } from "@/utils/supabase";
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
  const [userPosts, setUserPosts] = useState<PostProps[] | null>(null);
  const [isAuthor, setIsAuthor] = useState<boolean>();
  const [isFollowed, setIsFollowed] = useState<boolean>();
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
        setIsAuthor(userFetch.data[0].id === user!.id);
      } else {
        if (user?.id) {
          router.push(`/profile/${user.id}`);
          return;
        }
        router.push("/");
      }
    }
  }, [userFetch, userData, isComplete, router, user]);

  //fetch post data
  useEffect(() => {
    if (userData && !userPosts) {
      getUserPosts(supabase, userData.id).then((data) =>
        setUserPosts(data.data)
      );
    }
  }, [userData, userPosts, supabase]);

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
      <Header isLoggedIn />
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
                    value={userPosts?.length}
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
