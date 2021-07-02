import { Injectable } from '@nestjs/common';
import { Hotel, HotelDocument } from './entity/hotel.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IHotelService } from './interfaces/IHotelService';
import { ID } from '../../common/types';
import { CreateHotelDto } from './dto/CreateHotelDto';
import { ISearchHotelParams } from './interfaces/ISearchHotelParams';
import { pick } from '../../common/utils/commonUtils';

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

  search(params: ISearchHotelParams): Promise<HotelDocument[]> {
    const queryParams = pick(['title'], params);
    const limit = params.limit || 0;
    const offset = params.offset || 0;
    return this.hotelModel
      .find(queryParams)
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();
  }

  update(id: ID, data: Partial<Hotel>): Promise<Hotel> {
    return Promise.resolve(undefined);
  }
}
