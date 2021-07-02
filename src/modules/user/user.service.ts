import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entity/user.schema';
import { Model } from 'mongoose';
import { IUserService } from './interfaces/IUserService.interface';
import { ID } from '../../common/types';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { ISearchUserParams } from './interfaces/ISearchUserParams';
import { generateHashPassword } from '../../common/utils/authUtils';
import { ConfigService } from '@nestjs/config';
import { isEmptyObject, pick } from '../../common/utils/commonUtils';

type UserWithHashPassword = RegisterUserDto & { passwordHash: string };

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async create(userDto: RegisterUserDto): Promise<UserDocument> {
    const exitedUser = await this.findByEmail(userDto.email);
    if (exitedUser) {
      throw new BadRequestException(
        'The account with the provided email currently exists. Please choose another one.',
      );
    }
    const preparedUser = this.prepareUserData(userDto);
    return this.userModel.create(preparedUser);
  }

  async findAll(params: ISearchUserParams): Promise<User[]> {
    console.log(params);
    //TODO надо подумать, нужно ли тут проверять на emoty
    //если он будет пуст то поиск норм отработает и без этой проверки
    if (isEmptyObject(params)) {
      return this.userModel.find().exec();
    }
    const queryParams = pick(['name', 'email', 'contactPhone'], params);
    const limit = params.limit || 0;
    const offset = params.offset || 0;
    return this.userModel
      .find(queryParams)
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findById(id: ID): Promise<User> {
    return this.userModel.findById(id);
  }

  private prepareUserData(user: RegisterUserDto): UserWithHashPassword {
    const passwordHash = generateHashPassword(
      {
        salt: this.configService.get('CRYPTO_SALT'),
        iterations: this.configService.get('CRYPTO_ITERATIONS'),
        length: this.configService.get('CRYPTO_LENGTH'),
        digest: this.configService.get('CRYPTO_DIGEST'),
      },
      user.password,
    );
    return { ...user, passwordHash };
  }
}
