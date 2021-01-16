import { GameSlideshow } from './game-slideshow';
import { GameTag } from './game-tag';

export interface Game {
  id: number;
  createdAt: Date;
  title: string;
  description: string;
  price: number;
  bannerBase64: string;
  slideshows: GameSlideshow[];
  tags: GameTag[];
  systemRequirements: string;
}
