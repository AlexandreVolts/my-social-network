import { User } from "./User";

export interface PostProps {
  id: string;
  created_at: number;
  updated_at: number;
  content: string;
  users: User;
}

