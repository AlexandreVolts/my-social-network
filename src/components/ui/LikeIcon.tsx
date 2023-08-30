import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

interface LikeIconProps {
  isLiked: boolean;
}

export function LikeIcon(props: LikeIconProps) {
  if (props.isLiked) {
    return <IconHeartFilled className="text-red-500" />
  }
  return <IconHeart />
}