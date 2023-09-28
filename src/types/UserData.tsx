import { UUID } from "crypto";

export interface UserData {
  id: UUID;
  created_at?: number;
  name: string;
  surname: string;
  birthday?: Date;
  adress?: string;
  avatar_src?: string;
  description?: string;
}