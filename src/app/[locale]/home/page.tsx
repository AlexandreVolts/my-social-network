"use client";

import { CommentCard } from "@/components/CommentCard";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { PublishModal } from "@/components/PublishModal";
import { Card } from "@/components/ui/Card";
import { useUser } from "@/hooks/useUser";
import { getPosts } from "@/utils/getPosts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { use, useEffect, useState } from "react";

export default function Home() {
  const supabase = createClientComponentClient();
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();
  const t = useTranslations("Home");
  const [opened, setOpened] = useState(false);
  const [postContent, setPostContent] = useState("");
  const homePosts = use(getPosts(supabase));

  const posts = homePosts.data;

  const onPublish = async () => {
    const data = await supabase.from("posts").insert({ content: postContent });

    // TODO: Manage response
    setOpened(false);
    setPostContent("");
  };

  useEffect(() => {
    if (isComplete && !user) {
      router.push("/");
    }
  });

  return (
    <>
      <PublishModal
        opened={opened}
        value={postContent}
        isLoading={false}
        onClose={() => setOpened(false)}
        onChange={setPostContent}
        onPublish={onPublish}
      />
      <Header isLoggedIn />
      <main className="flex flex-col items-center justify-between p-24">
        <div className="flex flex-col w-1/2 space-y-2">
          <div className="cursor-pointer" onClick={() => setOpened(true)}>
            <Card>
              <h3 className="text-3xl font-bold">{t("publish-modal-title")}</h3>
              <p className="text-gray-500">{t("publish-subtitle")}</p>
            </Card>
          </div>
          {posts?.map((postInfo, index) => {
            return (
              <PostCard
                key={index}
                name={postInfo.users.name}
                surname={postInfo.users.surname}
                createdAt={new Date(postInfo.created_at)}
                text={postInfo.content}
                likeCount={0}
                isAuthor={user?.id === postInfo.users.id}
                onClick={() => {}}
                onEdit={() => {}}
                onComment={() => {}}
                onShare={() => {}}
                onLike={() => {}}
                onDelete={() => {}}
              >
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <CommentCard
                      key={index}
                      name={"test"}
                      surname={`${index}`}
                      likeCount={0}
                      text={"Test comment"}
                      createdAt={new Date()}
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
    </>
  );
}
