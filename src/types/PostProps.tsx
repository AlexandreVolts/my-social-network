export interface PostProps {
  id: string;
  created_at: number;
  updated_at: number;
  content: string;
  users: User;
}

interface User {
  name: string;
  surname: string;
  id: string;
}