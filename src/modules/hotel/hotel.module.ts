import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './entity/hotel.entity';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './HotelRoomService';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

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
