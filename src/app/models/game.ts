import { GameSlideshow } from './game-slideshow';
import { GameTag } from './game-tag';
import { AssetFile } from './asset-file';
import { GameGenre } from './game-genre';
import { GameReview } from './game-review';
import { GameDiscussion } from './game-discussion';

export interface Game {
  id: number;
  banner: AssetFile;
  createdAt: Date;
  description: string;
  developer: string;
  discount: number;
  discussions: GameDiscussion[];
  genre: GameGenre;
  isInappropriate: boolean;
  isInCart: boolean;
  isInWishlist: boolean;
  price: number;
  publisher: string;
  mostHelpfulReviews: GameReview[];
  recentReviews: GameReview[];
  slideshows: GameSlideshow[];
  systemRequirements: string;
  tags: GameTag[];
  title: string;
  topDiscussions: GameDiscussion[];
}
