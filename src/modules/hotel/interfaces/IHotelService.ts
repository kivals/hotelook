import { Hotel } from '../entity/hotel.entity';
import { ID } from '../../../common/types';

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]>;
}
