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
  level: number;
  friendCode: string;
  friends: User[];
  games: Game[];
  ingoingFriendRequests: User[];
  outgoingFriendRequests: User[];
  profilePicture: AssetFile;
  profileTheme: string;
  realName: string;
  receivedGiftsCount: number;
  receivedInvitesCount: number;
  receivedMessagesCount: number;
  receivedProfileCommentsCount: number;
  reportCounts: number;
  stream: string;
  summary: string;
  suspendedAt: Date;
  walletBalance: number;
  wishlist: Game[];
  wishlistCount: number;
}
