import { User } from './user';
import { Game } from './game';
import { GameReviewComment } from './game-review-comment';

export interface GameReview {
  id: number;
  comment: { data: GameReviewComment[]; totalPages: number };
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
