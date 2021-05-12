import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Hotel } from './hotel.entity';

@Schema()
export class HotelRoom {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  })
  hotel: Hotel;

  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  isEnabled: boolean;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: [String],
    default: [],
  })
  images: string[];
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
