import { ChooseRequestEnum } from '../enums/choose-request.enum';

export interface ICatFlagData<T> {
  name: ChooseRequestEnum;
  data:T
}