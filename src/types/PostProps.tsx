import { UserData } from "./UserData";

export interface PostProps {
  id: string;
  created_at: number;
  updated_at: number;
  content: string;
  users: UserData;
}

