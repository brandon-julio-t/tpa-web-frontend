import { User } from './user';

export interface PrivateMessage {
  id: number;
  text: string;
  sender: User;
  createdAt: Date;
}
