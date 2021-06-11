import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/LoginUserDto';
import { UserService } from './user.service';

@Controller('/api/auth/')
export class UserController {
  constructor(private readonly userService: UserService) {
  }


}
