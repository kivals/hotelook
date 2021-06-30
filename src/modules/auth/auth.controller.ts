import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginGuard } from '../../common/guards/login.guard';
import { RegisterUserDto } from '../user/dto/RegisterUserDto';
import { Request } from 'express';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { IRequestUser } from '../user/interfaces/IRequestUser';
import { ID } from '../../common/types';

interface IRegUserResponse {
  id: ID;
  email: string;
  name: string;
}

interface ILoginUserResponse {
  email: string;
  name: string;
  contactPhone: string;
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoginGuard)
  @Post('login')
  login(@Req() request: IRequestUser): ILoginUserResponse {
    const { email, name, contactPhone } = request.user;
    return {
      email,
      name,
      contactPhone,
    };
  }

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<IRegUserResponse> {
    const regUser = await this.authService.register(registerUserDto);
    return {
      id: regUser.id,
      email: regUser.email,
      name: regUser.name,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Req() request: Request) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }
}
