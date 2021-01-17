import { Country } from './country';
import { AssetFile } from './asset-file';

export interface User {
  id: number;
  accountName: string;
  country: Country;
  customUrl: string;
  displayName: string;
  email: string;
  profilePicture: AssetFile;
  profileTheme: string;
  realName: string;
  summary: string;
  walletBalance: number;
  suspendedAt: Date;
  reportCounts: number;
}
