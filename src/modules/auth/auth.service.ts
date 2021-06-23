import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from '../user/dto/RegisterUserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registerUserDto: RegisterUserDto) {
    const passwordHash = this.generateHashPassword(registerUserDto.password);
    return this.userService.create({
      ...registerUserDto,
      passwordHash,
    });
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
    const passwordHash = this.generateHashPassword(userPassword);
    return existPassword === passwordHash;
  }

  private generateHashPassword(password: string): string {
    const salt = this.configService.get('CRYPTO_SALT');
    const iterations = this.configService.get('CRYPTO_ITERATIONS');
    const length = this.configService.get('CRYPTO_LENGTH');
    const digest = this.configService.get('CRYPTO_DIGEST');
    return crypto
      .pbkdf2Sync(password, salt, iterations, length, digest)
      .toString('hex');
  }
}
