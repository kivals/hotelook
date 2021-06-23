import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginGuard } from '../../common/guards/login.guard';
import { RegisterUserDto } from '../user/dto/RegisterUserDto';
import { Request } from 'express';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Req() request: Request) {
    return request.user;
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Req() request: Request) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }
}
