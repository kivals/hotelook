import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterUserDto {
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
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  name: string;

  /**
   * Password field
   */
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
