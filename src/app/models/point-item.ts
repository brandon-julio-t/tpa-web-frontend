import { AssetFile } from './asset-file';

export interface PointItem {
  id: number;
  category: string;
  name: string;
  price: number;
  image: AssetFile;
}
