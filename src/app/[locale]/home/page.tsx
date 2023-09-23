"use client";

import { CommentCard } from "@/components/CommentCard";
import { CreatePostCard } from "@/components/CreatePostCard";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Toaster } from "@/components/ui/Toaster";
import { useRestQuery } from "@/hooks/useRestQuery";
import { useUser } from "@/hooks/useUser";
import { getLikes, getLike, getPosts } from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
    "post_likes",
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
          {posts?.data
            ?.filter((post) => !post.answer_to)
            .map((post) => {
              return (
                <PostCard
                  key={post.id}
                  name={post.users.name}
                  surname={post.users.surname}
                  createdAt={new Date(post.created_at)}
                  updatedAt={new Date(post.updated_at)}
                  text={post.content}
                  userId={post.users.id}
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
                  onComment={(comment) =>
                    postHandlers.create({
                      content: comment,
                      answer_to: post.id,
                    })
                  }
                  onDelete={() => postHandlers.delete({ id: post.id })}
                  onEdit={(content) =>
                    postHandlers.update({ id: post.id }, { content })
                  }
                  onLike={() => onLike(post.id)}
                  onShare={() => {}}
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
            ? t(`Post.on-success-${posts.action!}-msg`)
            : `${t(`Post.on-fail-${posts.action!}-msg`)}${posts.error.message}`
        }
      />
    </>
  );
}
