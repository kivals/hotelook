import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../user.service';
import { SearchUserDto } from '../dto/SearchUserDto';
import { RolesGuard } from '../../../common/guards/role.quard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

@UseGuards(RolesGuard)
@Controller('api/manager/')
export class ManagerController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @Roles(Role.Manager)
  async getUsers(@Query() searchUserDto: SearchUserDto) {
    return this.userService.findAll(searchUserDto);
  }
}
