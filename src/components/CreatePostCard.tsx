import { useState } from "react";
import { PublishModal } from "./PublishModal";
import { Card } from "./ui/Card";
import { useTranslations } from "next-intl";

interface CreatePostCard {
  onPublish: (content: string) => void;
  isLoading: boolean;
}
export function CreatePostCard(props: CreatePostCard) {
  const t = useTranslations("Home");
  const [isPublishModalOpened, setIsPublishedModalOpened] = useState(false);

  return (
    <>
      <PublishModal
        opened={isPublishModalOpened}
        isLoading={props.isLoading}
        title={t("publish-modal-title")}
        onClose={() => setIsPublishedModalOpened(false)}
        onPublish={props.onPublish}
      />
      <div
        className="cursor-pointer"
        onClick={() => setIsPublishedModalOpened(true)}
      >
        <Card>
          <h3 className="text-3xl font-bold">{t("publish-modal-title")}</h3>
          <p className="text-gray-500">{t("publish-subtitle")}</p>
        </Card>
      </div>
    </>
  );
}
