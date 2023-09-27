import { UUID } from "crypto";

export interface BasePublishedContentProps {
  name: string;
  surname: string;
  avatarSrc?: string;
  avatarColor?: string;
  userId: UUID;
  createdAt: Date;
  updatedAt: Date;
  likeCount: number;
  isLiked: boolean;
  text: string;
  charLimit?: number;
  onEdit: (content: string) => void;
  onDelete: () => void;
  onLike: () => void;
  onComment: (comment: string) => void;
  onShare: () => void;
}