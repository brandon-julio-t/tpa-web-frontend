import { MarketItem } from './market-item';

export interface MarketItemOffer {
  id: number;
  marketItem: MarketItem;
  price: number;
  quantity: number;
}
