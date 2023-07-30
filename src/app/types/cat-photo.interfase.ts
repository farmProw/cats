import { ICatInfo } from './cat-info.interface';

export interface ICatPhoto {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: ICatInfo[];
}