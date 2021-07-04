import { IHotelRoomService } from './interfaces/IHotelRoomService';
import { Inject, Injectable } from '@nestjs/common';
import { HotelRoom, HotelRoomDocument } from './entity/hotel-room.entity';
import { ID } from '../../common/types';
import { ISearchRoomsParams } from './interfaces/ISearchRoomsParams';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel } from './entity/hotel.entity';
import { Model } from 'mongoose';

/**
 * HotelRoom service
 * TODO
 */
@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly hotelRoomModel: Model<HotelRoomDocument>,
  ) {}
  async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const createdHotelRoom = await new this.hotelRoomModel(data).save();
    return createdHotelRoom.populate('hotel').execPopulate();
  }

  findById(id: ID, isEnabled?: true): Promise<HotelRoom> {
    return Promise.resolve(undefined);
  }

  search(params: ISearchRoomsParams): Promise<HotelRoom[]> {
    return Promise.resolve([]);
  }

  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return Promise.resolve(undefined);
  }
}
