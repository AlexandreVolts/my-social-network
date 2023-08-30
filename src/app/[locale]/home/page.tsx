"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { PublishModal } from "@/components/PublishModal";
import { Card } from "@/components/ui/Card";
import { Toaster } from "@/components/ui/Toaster";
import { useQuery } from "@/hooks/useQuery";
import { useUser } from "@/hooks/useUser";
import {
  deletePost,
  getPosts,
  getLikes,
  addLike,
  getALike,
  removeLike,
} from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = createClientComponentClient();
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();
  const t = useTranslations();

  const [isPublishModalOpened, setIsPublishedModalOpened] = useState(false);
  const [postContent, setPostContent] = useState("");

  const { data: posts, handlers: postHandlers } = useQuery(() =>
    getPosts(supabase)
  );
  const { data: likes, handlers: likeHandlers } = useQuery(() =>
    getLikes(supabase)
  );

  const [errorMsg, setErrorMsg] = useState<string>();

  const onPublish = async () => {
    const data = await supabase.from("posts").insert({ content: postContent });

    setIsPublishedModalOpened(false);
    setPostContent("");
    if (data.error) {
      setErrorMsg(data.error.message);
      return;
    }
    postHandlers.update();
  };

  const onDelete = async (postId: string) => {
    const data = await deletePost(supabase, postId);

    if (data.error) {
      setErrorMsg(data.error.message);
      return;
    }
    postHandlers.update();
  };

  const onLike = async (postId: string) => {
    const data = await getALike(supabase, user!.id, postId);
    if (data.data?.length) {
      removeLike(supabase, user!.id, postId).then(likeHandlers.update);
    } else {
      addLike(supabase, user!.id, postId).then(likeHandlers.update);
    }
  };

  useEffect(() => {
    if (isComplete && !user) {
      router.push("/");
    }
  });

  return (
    <>
      <PublishModal
        opened={isPublishModalOpened}
        value={postContent}
        isLoading={false}
        onClose={() => setIsPublishedModalOpened(false)}
        onChange={setPostContent}
        onPublish={onPublish}
      />
      <Header isLoggedIn />
      <main className="flex flex-col items-center justify-between p-12">
        <div className="flex flex-col space-y-2 sm:w-1/2 w-full">
          <div
            className="cursor-pointer"
            onClick={() => setIsPublishedModalOpened(true)}
          >
            <Card>
              <h3 className="text-3xl font-bold">
                {t("Home.publish-modal-title")}
              </h3>
              <p className="text-gray-500">{t("Home.publish-subtitle")}</p>
            </Card>
          </div>
          {posts?.data?.map((postInfo, index) => {
            return (
              <PostCard
                key={index}
                name={postInfo.users.name}
                surname={postInfo.users.surname}
                createdAt={new Date(postInfo.created_at)}
                text={postInfo.content}
                likeCount={
                  likes?.data?.filter((like) => like.post_id === postInfo.id)
                    .length ?? 0
                }
                isLiked={
                  !!likes?.data?.find(
                    (like) =>
                      like.post_id === postInfo.id && like.user_id === user?.id
                  )
                }
                isAuthor={user?.id === postInfo.users.id}
                onClick={() => {}}
                onComment={() => {}}
                onDelete={() => onDelete(postInfo.id)}
                onEdit={() => {}}
                onLike={() => onLike(postInfo.id)}
                onShare={() => {}}
              >
                <></>
              </PostCard>
            );
          }) ?? <></>}
        </div>
      </main>
      <Toaster
        opened={errorMsg !== undefined}
        onClose={() => setErrorMsg(undefined)}
        title={!errorMsg ? t("Utils.on-success") : t("Utils.on-fail")}
        isValid={!errorMsg}
        message={
          !errorMsg
            ? t("Utils.on-success-delete-msg")
            : `${t("Utils.on-fail-delete-msg")}${errorMsg}`
        }
      />
    </>
  );
}
