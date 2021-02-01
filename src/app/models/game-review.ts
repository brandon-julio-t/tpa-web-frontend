import { User } from './user';
import { Game } from './game';

export interface GameReview {
  id: number;
  content: number;
  createdAt: Date;
  downVoters: User[];
  downVotes: number;
  game: Game;
  isRecommended: boolean;
  upVoters: User[];
  upVotes: number;
  user: User;
}
