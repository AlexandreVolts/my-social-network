import { User } from "./User";

export interface FollowProps {
  follower: User;
  target: User;
  created_at: number;
  validated: boolean;
}