"use client";

import { CreatePostCard } from "@/components/CreatePostCard";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Toaster } from "@/components/ui/Toaster";
import { useQuery } from "@/hooks/useQuery";
import { useRestQuery } from "@/hooks/useRestQuery";
import { useUser } from "@/hooks/useUser";
import { PostProps } from "@/types/PostProps";
import {
  getLikes,
  addLike,
  getALike,
  removeLike,
  getPosts,
} from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { useEffect } from "react";

export default function Home() {
  const supabase = createClientComponentClient();
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();
  const t = useTranslations();

  const { data: posts, handlers: postHandlers } = useRestQuery<PostProps[]>(
    supabase,
    "posts",
    () => getPosts(supabase)
  );
  const { data: likes, handlers: likeHandlers } = useQuery(() =>
    getLikes(supabase)
  );

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

  console.log(posts)
  return (
    <>
      <Header isLoggedIn />
      <main className="flex flex-col items-center justify-between p-12">
        <div className="flex flex-col space-y-2 sm:w-1/2 w-full">
          <CreatePostCard
            onPublish={(content: string) => postHandlers.create({ content })}
            isLoading={posts.isLoading}
          />
          {posts?.data?.map((post, index) => {
            return (
              <PostCard
                key={index}
                name={post.users.name}
                surname={post.users.surname}
                createdAt={new Date(post.created_at)}
                text={post.content}
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
                isAuthor={user?.id === post.users.id}
                isLoading={posts.isLoading}
                onClick={() => {}}
                onComment={() => {}}
                onDelete={() => postHandlers.delete(post.id)}
                onEdit={(content) => postHandlers.update(post.id, { content })}
                onLike={() => onLike(post.id)}
                onShare={() => {}}
              >
                <></>
              </PostCard>
            );
          }) ?? <></>}
        </div>
      </main>
      <Toaster
        opened={posts.showMessage}
        onClose={postHandlers.dismissMessage}
        title={!posts.error ? t("Utils.on-success") : t("Utils.on-fail")}
        isValid={!posts.error}
        message={
          !posts.error
            ? t("Utils.on-success-delete-msg")
            : `${t("Utils.on-fail-delete-msg")}${posts.error.message}`
        }
      />
    </>
  );
}
