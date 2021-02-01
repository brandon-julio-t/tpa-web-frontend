import { User } from './user';

export interface CommunityImageAndVideoComment {
  id: number;
  body: string;
  createdAt: Date;
  user: User;
}
