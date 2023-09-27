import { UUID } from "crypto";
import { UserData } from "./UserData";

export interface PostProps {
  id: UUID;
  created_at: number;
  updated_at: number;
  content: string;
  users: UserData;
  answer_to?: UUID;
}

