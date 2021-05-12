import { IHotelRoomService } from './interfaces/IHotelRoomService';
import { Injectable } from '@nestjs/common';
import { HotelRoom } from './entity/hotel-room.entity';
import { ID } from '../../common/types';
import { SearchRoomsParams } from './interfaces/SearchRoomsParams';

/**
 * HotelRoom service
 * TODO
 */
@Injectable()
export class HotelRoomService implements IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    return Promise.resolve(undefined);
  }

  findById(id: ID, isEnabled?: true): Promise<HotelRoom> {
    return Promise.resolve(undefined);
  }

  search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    return Promise.resolve([]);
  }

  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return Promise.resolve(undefined);
  }
}
