"use client";

import { Header } from "@/components/Header";
import { PublishModal } from "@/components/PublishModal";
import { Card } from "@/components/ui/Card";
import { useUser } from "@/hooks/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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

  const onPublish = async () => {
    const data = await supabase.from("posts").insert({
      author: user?.id,
      content: postContent,
    });

    // TODO: Manage response
    setOpened(false);
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
        <div
          className="flex w-1/3 cursor-pointer"
          onClick={() => setOpened(true)}
        >
          <Card>
            <h3 className="text-3xl font-bold">{t("publish-modal-title")}</h3>
            <p className="text-gray-500">{t("publish-subtitle")}</p>
          </Card>
        </div>
      </main>
    </>
  );
}
