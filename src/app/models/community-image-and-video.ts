import { CommunityImageAndVideoComment } from './community-image-and-video-comment';
import { User } from './user';
import { AssetFile } from './asset-file';

export interface CommunityImageAndVideo {
  id: number;
  comments: { data: CommunityImageAndVideoComment[]; totalPages: number };
  createdAt: Date;
  description: string;
  dislikes: number;
  file: AssetFile;
  isDisliked: boolean;
  isLiked: boolean;
  likes: number;
  user: User;
  name: string;
}
