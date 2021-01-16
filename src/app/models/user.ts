import { Country } from './country';

export interface User {
  id: number;
  accountName: string;
  country: Country;
  customUrl: string;
  displayName: string;
  email: string;
  profilePictureBase64: string;
  profileTheme: string;
  realName: string;
  summary: string;
  walletBalance: number;
  suspendedAt: Date;
  reportCounts: number;
}
