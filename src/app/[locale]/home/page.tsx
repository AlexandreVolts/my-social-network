"use client";

import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { PublishModal } from "@/components/PublishModal";
import { Card } from "@/components/ui/Card";
import { useUser } from "@/hooks/useUser";
import { PostProps } from "@/types/PostProps";
import { getPosts } from "@/utils/getPosts";
import { SupabaseClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = createClientComponentClient();
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();
  const t = useTranslations("Home");
  const [opened, setOpened] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [homePosts, setHomePosts] = useState<PostProps[]|null>(null);
  const [postFetched, setPostFetched] = useState(false);

  const onPublish = async () => {
    const data = await supabase.from("posts").insert({ content: postContent });

    // TODO: Manage response
    setOpened(false);
    setPostContent('');
  };

  useEffect(() => {
    if (isComplete && !user) {
      router.push("/");
    }
  });

  //get Posts
  useEffect(()=>{
    if (!homePosts&&supabase&&!postFetched) {
      setPostFetched(true);
      getPosts(supabase).then((data)=>setHomePosts(data?.data));
    }
  })

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
        <div
          className="flex w-1/3 cursor-pointer"
          onClick={() => setOpened(true)}
        >
          <Card>
            <h3 className="text-3xl font-bold">{t("publish-modal-title")}</h3>
            <p className="text-gray-500">{t("publish-subtitle")}</p>
          </Card>
        </div>
        <div className="flex flex-col w-1/2 space-y-2">
          {homePosts?
          homePosts.map((postInfo, index)=>{
            return (
              <PostCard
                key={index}
                name={postInfo.users.name}
                surname={postInfo.users.surname}
                createdAt={new Date(postInfo.created_at)}
                text={postInfo.content}
                likeCount={0}
                isOpened={true}
                onCommentClick={()=>{}}
                onLikeClick={()=>{}}
                onSettingClick={()=>{}}
                onShareClick={()=>{}}
              >
                
              </PostCard>
            )
          })
        :<></>}
        </div>
      </main>
    </>
  );
}
