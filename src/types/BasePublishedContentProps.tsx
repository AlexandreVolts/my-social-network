export interface BasePublishedContentProps {
  name: string;
  surname: string;
  avatarSrc?: string;
  avatarColor?: string;
  createdAt: Date;
  likeCount: number;
  isLiked: boolean;
  text: string;
  charLimit?: number;
  onEdit: () => void;
  onDelete: () => void;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}