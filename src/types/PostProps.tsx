export interface PostProps {
  created_at: number;
  content: string;
  users: Identity;
}

interface Identity {
  name: string;
  surname: string;
  id: string;
}