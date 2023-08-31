import { UserData } from "./UserData";

export interface FollowProps {
  follower: UserData;
  target: UserData;
  created_at: number;
  validated: boolean;
}