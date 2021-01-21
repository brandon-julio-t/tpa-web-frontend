import { GameSlideshow } from './game-slideshow';
import { GameTag } from './game-tag';
import { AssetFile } from './asset-file';
import { GameGenre } from './game-genre';

export interface Game {
  id: number;
  banner: AssetFile;
  createdAt: Date;
  description: string;
  genre: GameGenre;
  isInappropriate: boolean;
  isInCart: boolean;
  isInWishlist: boolean;
  price: number;
  slideshows: GameSlideshow[];
  systemRequirements: string;
  tags: GameTag[];
  title: string;
}
