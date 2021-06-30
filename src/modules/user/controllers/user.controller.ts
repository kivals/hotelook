import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/CreateUserDto';
import { RolesGuard } from '../../../common/guards/role.quard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

@Controller('/api/')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('/admin/users/')
  // @Roles(Role.Client)
  create(@Body() createUserDto: CreateUserDto) {
    const createdUser = this.userService.create(createUserDto);
    return createdUser;
  }
}
