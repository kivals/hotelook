import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entity/user.schema';
import { Model } from 'mongoose';
import {
  IUserService,
  SearchUserParams,
} from './interfaces/IUserService.interface';
import { ID } from '../../common/types';
import { RegisterUserDto } from './dto/RegisterUserDto';

type regUser = RegisterUserDto & { passwordHash: string };

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: regUser): Promise<User> {
    const exitedUser = await this.findByEmail(user.email);
    if (exitedUser) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.',
      );
    }
    return this.userModel.create(user);
  }

  findAll(params: SearchUserParams): Promise<User[]> {
    return Promise.resolve([]);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  findById(id: ID): Promise<User> {
    return Promise.resolve(undefined);
  }
}
