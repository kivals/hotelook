import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/LoginUserDto';
import { LoginGuard } from '../../common/guards/login.guard';
import { RegisterUserDto } from '../user/dto/RegisterUserDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @UseGuards(LoginGuard)
  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log('Auth controller');
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    return user;
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    console.log('Reg controller');
    const passwordHash = this.authService.generateHashPassword(registerUserDto.password);
    return await this.userService.create({
      ...registerUserDto,
      passwordHash,
    });
  }
}
