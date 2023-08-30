"use client";

import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { ActionIcon } from "@/components/ui/ActionIcon";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { useUser } from "@/hooks/useUser";
import { PostProps } from "@/types/PostProps";
import { UserData } from "@/types/UserData";
import { getUserInfos, getUserPosts } from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IconPencil } from "@tabler/icons-react";
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

  //fetch handling and redirection
  useEffect(() => {
    if (!userData && isComplete) {
      if (userFetch.data) {
        setUserData(userFetch.data[0]);
        setIsAuthor(userFetch.data[0].id === user!.id);
      } else  {
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
              <p>{t("birthdate"), userData?.birthday}</p>
              <p>{t("adress") + userData?.adress}</p>
            </div>
            <div className="grid grid-cols-3 space-x-2">
              <Button label={t("follow")} size="sm" />
              <Button label={t("message")} secondary size="sm" />
              <Button label={t("email")} secondary size="sm" />
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
            <p className="bold">Posts : {userPosts?.length}</p>
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
