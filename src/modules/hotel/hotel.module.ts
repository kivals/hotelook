import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './entity/hotel.entity';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './HotelRoomService';
import { HotelController } from './controllers/hotel.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Hotel.name,
        schema: HotelSchema,
      },
    ]),
  ],
  controllers: [HotelController],
  providers: [HotelService, HotelRoomService],
})
export class HotelModule {}
