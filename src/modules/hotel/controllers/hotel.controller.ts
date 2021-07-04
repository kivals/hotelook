import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HotelService } from '../hotel.service';
import { HotelRoomService } from '../HotelRoomService';
import { AuthenticatedGuard } from '../../../common/guards/authenticated.guard';
import { ID } from '../../../common/types';
import { RolesGuard } from '../../../common/guards/role.quard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { SearchUserDto } from '../../user/dto/SearchUserDto';
import { HotelDocument } from '../entity/hotel.entity';
import { HotelDto } from '../dto/HotelDto';

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
@Controller('api/admin/hotels')
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  /**
   * Retrieves all cats
   * @return {Promise<Hotel[]> queried hotels}
   */
  //@UseGuards(AuthenticatedGuard)
  @Get()
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

  @Post()
  // @Roles(Role.Admin)
  async createHotel(@Body() createHotelDto: HotelDto): Promise<IHotelResponse> {
    const createdUser = await this.hotelService.create(createHotelDto);
    return {
      id: createdUser.id,
      title: createdUser.title,
      description: createdUser.description,
    };
  }

  @Put(':id')
  async updateHotel(
    @Param('id') id,
    @Body() data: HotelDto,
  ): Promise<IHotelResponse> {
    const updatedHotel: HotelDocument = await this.hotelService.update(
      id,
      data,
    );
    return {
      id: updatedHotel.id,
      title: updatedHotel.title,
      description: updatedHotel.description,
    };
  }
}
