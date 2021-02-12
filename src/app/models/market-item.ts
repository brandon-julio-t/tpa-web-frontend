import { AssetFile } from './asset-file';
import { Game } from './game';

export interface MarketItem {
  id: number;
  description: string;
  game: Game;
  image: AssetFile;
  name: string;
  startingPrice: number;
  transactionsCount: number;
}
