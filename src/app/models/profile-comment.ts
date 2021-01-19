import { User } from './user';

export interface ProfileComment {
  id: number;
  user: User;
  profile: User;
  comment: string;
  createdAt: Date;
}
