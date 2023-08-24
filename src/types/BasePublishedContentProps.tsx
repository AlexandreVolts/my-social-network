export interface BasePublishedContentProps {
  name: string;
  surname: string;
  avatarSrc?: string;
  avatarColor?: string;
  createdAt: Date;
  likeCount: number;
  text: string;
  charLimit?: number;
}