import { Country } from './country';

export interface User {
  id: number;
  accountName: string;
  email: string;
  country: Country;
}
