import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/CreateUserDto';
import { ID } from '../../../common/types';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';
import { RolesGuard } from '../../../common/guards/role.quard';
import { SearchUserDto } from '../dto/SearchUserDto';

interface ICreateUserResponse {
  id: ID;
  email: string;
  name: string;
  contactPhone: string;
  role: string;
}

@UseGuards(RolesGuard)
@Controller('api/admin/')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @Roles(Role.Admin)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ICreateUserResponse> {
    const createdUser = await this.userService.create(createUserDto);
    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      contactPhone: createdUser.contactPhone,
      role: createdUser.role,
    };
  }

  @Get('users')
  @Roles(Role.Admin)
  async getUsers(@Query() searchUserDto: SearchUserDto) {
    return this.userService.findAll(searchUserDto);
  }
}
