import { HotelRoom } from '../entity/hotel-room.entity';
import { ID } from '../../../common/types';
import { ISearchRoomsParams } from './ISearchRoomsParams';

export interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ID, isEnabled?: true): Promise<HotelRoom>;
  search(params: ISearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
