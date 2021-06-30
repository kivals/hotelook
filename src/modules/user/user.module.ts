import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entity/user.schema';
import { UserService } from './user.service';
import { AdminController } from './controllers/admin.controller';
import { ManagerController } from './controllers/manager.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ManagerController, AdminController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
