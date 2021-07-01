import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type HotelDocument = Hotel & mongoose.Document;

@Schema({ timestamps: true })
export class Hotel {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
  })
  description: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
