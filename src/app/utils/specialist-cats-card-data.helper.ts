import { ChooseRequestEnum } from '../enums/choose-request.enum';
import { ICatInfo } from '../types/cat-info.interface';

export class SpecialistCatsCardData {
  constructor(public name: ChooseRequestEnum, public data: ICatInfo[]) {}
}