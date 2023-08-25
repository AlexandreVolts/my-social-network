"use client";

import { CommentCard } from "@/components/CommentCard";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { PublishModal } from "@/components/PublishModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Toaster } from "@/components/ui/Toaster";
import { useUser } from "@/hooks/useUser";
import { PostProps } from "@/types/PostProps";
import { deletePost, getPosts } from "@/utils/supabase";
import {
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { use, useEffect, useState } from "react";

export default function Home() {
  const supabase = createClientComponentClient();
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();
  const t = useTranslations("Home");

  const [openedDelete, setOpenedDelete] = useState(false);
  const [opened, setOpened] = useState(false);
  const [postContent, setPostContent] = useState("");
  const homePosts = use(getPosts(supabase));
  //useToasters
  const [isErrorDelete, setIsErrorDelete] = useState<boolean>();
  //get Error message from supabase
  const [errorMsg, setErrorMsg] = useState("");

  const posts = homePosts.data;

  const onPublish = async () => {
    const data = await supabase.from("posts").insert({ content: postContent });

    // TODO: Manage response
    setOpened(false);
    setPostContent("");
  };

  const onDelete = () => {
    deletePost(supabase, user!.id).then((data) => {
      if (data.error) {
        setIsErrorDelete(true);
        setErrorMsg(data.error.message);
      }
      else {
      setIsErrorDelete(false);
      }
    });
    setOpenedDelete(false);
  };

  useEffect(() => {
    if (isComplete && !user) {
      router.push("/");
    }
  });

  return (
    <>
      <Modal
        opened={openedDelete}
        onClose={() => setOpenedDelete(false)}
        title="Do you want to delete this post ?"
      >
        <div className="flex justify-around">
          <Button label="Cancel" secondary onClick={() => setOpenedDelete(false)} />
          <Button label="Proceed" onClick={onDelete} />
        </div>
      </Modal>
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
                onClick={()=>{}}
                onComment={() => {}}
                onDelete={() => setOpenedDelete(true)}
                onEdit={() => {}}
                onLike={() => {}}
                onShare={() => {}}
              >

              </PostCard>
            );
          }) ?? <></>}
        </div>
      </main>
      <Toaster
        opened={isErrorDelete !== undefined}
        onClose={() => setIsErrorDelete(undefined)}
        title={!isErrorDelete ? "Success !" : "Oops !"}
        isValid={!isErrorDelete}
        message={
          !isErrorDelete
            ? "Post was successfuly deleted !"
            : `Something went wrong while trying to delete the post : ${errorMsg}`
        }
      />
    </>
  );
}
