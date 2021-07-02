import { Hotel } from '../entity/hotel.entity';
import { ID } from '../../../common/types';
import { ISearchHotelParams } from './ISearchHotelParams';

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: ISearchHotelParams): Promise<Hotel[]>;
  update(id: ID, data: Partial<Hotel>): Promise<Hotel>;
}
