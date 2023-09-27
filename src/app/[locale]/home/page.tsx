"use client";

import { CreatePostCard } from "@/components/CreatePostCard";
import { Header } from "@/components/Header";
import { PostList } from "@/components/PostList";
import { Toaster } from "@/components/ui/Toaster";
import { useRestQuery } from "@/hooks/useRestQuery";
import { useUser } from "@/hooks/useUser";
import { getLikes, getLike, getPosts } from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UUID } from "crypto";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { useEffect } from "react";

export default function Home() {
  const supabase = createClientComponentClient();
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();
  const t = useTranslations();

  const { data: posts, handlers: postHandlers } = useRestQuery(
    supabase,
    "posts",
    () => getPosts(supabase)
  );
  const { data: likes, handlers: likeHandlers } = useRestQuery(
    supabase,
    "likes",
    () => getLikes(supabase)
  );

  const onLike = async (postId: string) => {
    const data = await getLike(supabase, user!.id, postId);

    if (data.error) return;
    likeHandlers[data.data?.length ? "delete" : "create"]({
      post_id: postId,
      user_id: user!.id,
    });
  };

  useEffect(() => {
    if (isComplete && !user) {
      router.push("/");
    }
  });

  return (
    <>
      <Header userId={user?.id} />
      <main className="flex flex-col items-center justify-between p-12">
        <div className="flex flex-col space-y-2 lg:w-1/2 w-full">
          <CreatePostCard
            onPublish={(content: string) => postHandlers.create({ content })}
            isLoading={posts.isLoading}
          />
          {posts.data && likes.data ? (
            <PostList
              posts={posts.data}
              likes={likes.data}
              userId={user?.id as UUID}
              isLoading={false}
              onComment={(content, answerTo) =>
                postHandlers.create({ content, answer_to: answerTo })
              }
              onDelete={(id) => postHandlers.delete({ id })}
              onEdit={(id, content) => postHandlers.update({ id }, { content })}
            />
          ) : (
            <></>
          )}
        </div>
      </main>
      <Toaster
        opened={posts.showMessage}
        onClose={postHandlers.dismissMessage}
        title={!posts.error ? t("Utils.on-success") : t("Utils.on-fail")}
        isValid={!posts.error}
        message={
          !posts.error
            ? t(`Post.on-success-${posts.action!}-msg`)
            : `${t(`Post.on-fail-${posts.action!}-msg`)}${posts.error.message}`
        }
      />
    </>
  );
}
