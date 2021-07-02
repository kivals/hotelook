import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateRoomDto {
  @Matches(/^[a-zA-Zа-яА-Я ]+$/)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(2048)
  description: string;

  @IsString()
  @IsNotEmpty()
  hotelId: string;
}
