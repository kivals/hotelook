import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelRoomService } from '../HotelRoomService';
import { RolesGuard } from '../../../common/guards/role.quard';
import { CreateRoomDto } from '../dto/CreateRoomDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HotelRoom } from '../entity/hotel-room.entity';

@UseGuards(RolesGuard)
@Controller('/api/admin/hotel-rooms/')
export class HotelRoomsController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createRoom(
    @UploadedFiles() images,
    @Body() createDto: CreateRoomDto,
  ): Promise<HotelRoom> {
    const imagesPath = images.map((image) => image.path);
    const params = {
      ...createDto,
      images: imagesPath,
      hotel: createDto.hotelId,
    };
    console.log(imagesPath);
    // @ts-ignore
    return this.hotelRoomService.create(params);
  }
}
