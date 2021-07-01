import { Injectable } from '@nestjs/common';
import { Hotel, HotelDocument } from './entity/hotel.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IHotelService } from './interfaces/IHotelService';
import { ID } from '../../common/types';
import { CreateHotelDto } from './dto/CreateHotelDto';

/**
 * Hotel service
 * TODO
 */
@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>,
  ) {}

  create(hotelData: CreateHotelDto): Promise<HotelDocument> {
    return this.hotelModel.create(hotelData);
  }

  findById(id: ID): Promise<Hotel> {
    return Promise.resolve(undefined);
  }

  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]> {
    return Promise.resolve([]);
  }
}
