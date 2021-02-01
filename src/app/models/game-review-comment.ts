import { User } from './user';

export interface GameReviewComment {
  id: number;
  createdAt: Date;
  body: string;
  user: User;
}
