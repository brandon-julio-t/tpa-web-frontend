import { Game } from './game';
import { User } from './user';
import { GameDiscussionComment } from './game-discussion-comment';

export interface GameDiscussion {
  id: number;
  body: string;
  comments: { data: GameDiscussionComment[]; totalPages: number };
  createdAt: Date;
  game: Game;
  title: string;
  user: User;
}
