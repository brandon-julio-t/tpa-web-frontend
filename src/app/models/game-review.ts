import { User } from './user';

export interface GameReview {
  id: number;
  content: number;
  createdAt: Date;
  downVoters: User[];
  downVotes: number;
  isRecommended: boolean;
  upVoters: User[];
  upVotes: number;
  user: User;
}
