export interface PostProps {
  id: string;
  created_at: number;
  content: string;
  users: Identity;
}

interface Identity {
  name: string;
  surname: string;
  id: string;
}