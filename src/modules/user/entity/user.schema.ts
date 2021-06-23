import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import validator from 'validator';
import { Role } from '../../../common/enums/role.enum';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({
    required: true,
    type: String,
    lowercase: true,
    maxlength: 255,
    minlength: 6,
    validate: validator.isEmail,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  passwordHash: string;

  @Prop({
    type: String,
    minlength: 6,
    maxlength: 255,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    minlength: 3,
    maxlength: 64,
  })
  contactPhone: string;

  @Prop({
    type: String,
    minlength: 3,
    maxlength: 32,
    default: 'user',
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
