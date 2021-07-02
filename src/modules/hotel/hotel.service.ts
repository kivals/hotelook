import { Injectable } from '@nestjs/common';
import { Hotel, HotelDocument } from './entity/hotel.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IHotelService } from './interfaces/IHotelService';
import { ID } from '../../common/types';
import { HotelDto } from './dto/HotelDto';
import { ISearchHotelParams } from './interfaces/ISearchHotelParams';
import { pick } from '../../common/utils/commonUtils';
import { HotelNotFoundException } from '../../common/exceptions/HotelNotFoundException';

/**
 * Hotel service
 * TODO
 */
@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>,
  ) {}

  create(hotelData: HotelDto): Promise<HotelDocument> {
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

  async update(id: ID, data: Partial<Hotel>): Promise<HotelDocument> {
    const existHotel = await this.hotelModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
    if (!existHotel) {
      console.log('NOT');
      throw new HotelNotFoundException(id as string);
    }
    return existHotel;
  }
}
