import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from '../user/dto/RegisterUserDto';
import { generateHashPassword } from '../../common/utils/authUtils';
import { UserDocument } from '../user/entity/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async register(
    registerUserDto: RegisterUserDto,
  ): Promise<UserDocument> {
    return this.userService.create(registerUserDto);
  }

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && this.checkPassword(user.passwordHash, password)) {
      return user;
    }
    return null;
  }

  private checkPassword(existPassword: string, userPassword): boolean {
    if (!userPassword) return false;
    const passwordHash = generateHashPassword(
      {
        salt: this.configService.get('CRYPTO_SALT'),
        iterations: this.configService.get('CRYPTO_ITERATIONS'),
        length: this.configService.get('CRYPTO_LENGTH'),
        digest: this.configService.get('CRYPTO_DIGEST'),
      },
      userPassword,
    );
    return existPassword === passwordHash;
  }
}
