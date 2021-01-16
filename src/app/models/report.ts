import { User } from './user';

export interface Report {
  id: number;
  reporter: User;
  description: string;
  createdAt: Date;
}
