import { Country } from './country';
import { AssetFile } from './asset-file';
import { Game } from './game';

export interface User {
  id: number;
  accountName: string;
  cart: Game[];
  cartCount: number;
  country: Country;
  customUrl: string;
  displayName: string;
  email: string;
  friendCode: string;
  friends: User[];
  outgoingFriendRequests: User[];
  ingoingFriendRequests: User[];
  profilePicture: AssetFile;
  profileTheme: string;
  realName: string;
  reportCounts: number;
  stream: string;
  summary: string;
  suspendedAt: Date;
  walletBalance: number;
  wishlist: Game[];
  wishlistCount: number;
}
