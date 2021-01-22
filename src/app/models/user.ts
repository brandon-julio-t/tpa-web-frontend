import { Country } from './country';
import { AssetFile } from './asset-file';
import { Game } from './game';

export interface User {
  id: number;
  accountName: string;
  country: Country;
  customUrl: string;
  displayName: string;
  email: string;
  friends: User[];
  profilePicture: AssetFile;
  profileTheme: string;
  realName: string;
  reportCounts: number;
  summary: string;
  suspendedAt: Date;
  walletBalance: number;
  wishlist: Game[];
  wishlistCount: number;
  cart: Game[];
  cartCount: number;
}
