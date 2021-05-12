import { Controller, Get } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './HotelRoomService';

/**
 * Hotel controller
 * TODO
 */
@Controller('api/hotels')
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  /**
   * Retrieves all cats
   * @return {Promise<Hotel[]> queried hotels}
   */
  @Get()
  getHotels() {
    return [];
  }
}
