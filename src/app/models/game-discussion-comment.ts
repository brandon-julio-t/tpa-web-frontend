import { GameDiscussion } from './game-discussion';
import { User } from './user';

export interface GameDiscussionComment {
  id: number;
  body: string;
  communityDiscussion: { data: GameDiscussion[]; totalPages: number };
  createdAt: Date;
  user: User;
}
