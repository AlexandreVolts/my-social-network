"use client";

import { PublishModal } from "@/components/PublishModal";
import { Card } from "@/components/ui/Card";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Home() {
  const t = useTranslations("Home");
  const [opened, setOpened] = useState(false);
  const [postContent, setPostContent] = useState("");

  const onPublish = () => {};

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
      <main className="flex flex-col items-center justify-between p-24">
        <div className="flex w-1/3 cursor-pointer" onClick={() => setOpened(true)}>
          <Card>
            <h3 className="text-3xl font-bold">{t("publish-modal-title")}</h3>
            <p className="text-gray-500">{t("publish-subtitle")}</p>
          </Card>
        </div>
      </main>
    </>
  );
}
