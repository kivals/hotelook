import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './entity/hotel.entity';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './HotelRoomService';
import { HotelController } from './controllers/hotel.controller';
import { HotelRoomsController } from './controllers/hotel-rooms.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { imgFileName, imgFilter } from '../../common/utils/imgUpdate.utils';
import { HotelRoom, HotelRoomSchema } from './entity/hotel-room.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Hotel.name,
        schema: HotelSchema,
      },
      {
        name: HotelRoom.name,
        schema: HotelRoomSchema,
      },
    ]),
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: async (req, file, cb) => {
            const path: string = configService.get('UPLOAD_DEST');
            return cb(null, path);
          },
          filename: imgFileName,
        }),
        fileFilter: imgFilter,
        limits: {
          fieldSize: Number(configService.get('MAX_IMG_FILE_SIZE')),
          files: Number(configService.get('MAX_COUNT_FILES')),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [HotelController, HotelRoomsController],
  providers: [HotelService, HotelRoomService],
})
export class HotelModule {}
