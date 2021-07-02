import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { HotelService } from '../hotel.service';
import { HotelRoomService } from '../HotelRoomService';
import { AuthenticatedGuard } from '../../../common/guards/authenticated.guard';
import { ID } from '../../../common/types';
import { CreateHotelDto } from '../dto/CreateHotelDto';
import { RolesGuard } from '../../../common/guards/role.quard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { SearchUserDto } from '../../user/dto/SearchUserDto';
import { HotelDocument } from '../entity/hotel.entity';

//TODO вынести в отдельную папку и в других модулях тоже
interface IHotelResponse {
  id: ID;
  title: string;
  description: string;
}

/**
 * Hotel controller
 * TODO
 */
@UseGuards(RolesGuard)
@Controller('api/admin/')
export class AdminHotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  /**
   * Retrieves all cats
   * @return {Promise<Hotel[]> queried hotels}
   */
  //@UseGuards(AuthenticatedGuard)
  @Get('hotels')
  async getHotels(
    @Query() searchHotelDto: SearchUserDto,
  ): Promise<IHotelResponse[]> {
    const hotels: HotelDocument[] = await this.hotelService.search(
      searchHotelDto,
    );
    return hotels.map((hotel) => {
      return {
        id: hotel.id,
        title: hotel.title,
        description: hotel.description,
      };
    });
  }

  @Post('hotels')
  @Roles(Role.Admin)
  async createHotel(
    @Body() createHotelDto: CreateHotelDto,
  ): Promise<IHotelResponse> {
    const createdUser = await this.hotelService.create(createHotelDto);
    return {
      id: createdUser.id,
      title: createdUser.title,
      description: createdUser.description,
    };
  }
}
