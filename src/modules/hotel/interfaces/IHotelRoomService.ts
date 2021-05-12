import { HotelRoom } from '../entity/hotel-room.entity';
import { ID } from '../../../common/types';
import { SearchRoomsParams } from './SearchRoomsParams';

export interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ID, isEnabled?: true): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
