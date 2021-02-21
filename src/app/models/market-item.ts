import { AssetFile } from './asset-file';
import { Game } from './game';
import { MarketItemPrice } from './market-item-price';

export interface MarketItem {
  id: number;
  buyPrices: MarketItemPrice[];
  category: string;
  description: string;
  game: Game;
  image: AssetFile;
  name: string;
  pastMonthSales: { createdAt: Date; price: number }[];
  salePrices: MarketItemPrice[];
  startingPrice: number;
  transactionsCount: number;
}
