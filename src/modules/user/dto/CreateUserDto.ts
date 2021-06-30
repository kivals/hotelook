import { IsEmail, IsEnum, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { Role } from '../../../common/enums/role.enum';

export class CreateUserDto {
  /**
   * Email field
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Username field
   */
  @IsNotEmpty()
  contactPhone: string;

  /**
   * Name field
   */
  @Matches(/^[a-zA-ZА-Яа-я ]+$/)
  @IsNotEmpty()
  name: string;

  /**
   * Password field
   */
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  /**
   * Password field
   */
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
