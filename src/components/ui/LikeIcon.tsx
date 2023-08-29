import { IconHeart } from "@tabler/icons-react";

interface LikeIconProps {
  isLiked: boolean;
}

export function LikeIcon(props: LikeIconProps) {
  if (props.isLiked) {
    return <IconHeart fill="red" color="red"/>
  }
  return <IconHeart color="black"/>
}