import { Controller, Get, UseGuards } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './HotelRoomService';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';

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
  @UseGuards(AuthenticatedGuard)
  @Get()
  getHotels() {
    return [];
  }
}
