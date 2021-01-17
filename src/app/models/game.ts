import { GameSlideshow } from './game-slideshow';
import { GameTag } from './game-tag';
import { AssetFile } from './asset-file';

export interface Game {
  id: number;
  createdAt: Date;
  title: string;
  description: string;
  price: number;
  banner: AssetFile;
  slideshows: GameSlideshow[];
  tags: GameTag[];
  systemRequirements: string;
}
