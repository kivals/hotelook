import { IsNotEmpty, IsString } from 'class-validator';

export class HotelDto {
  /**
   * title field
   */
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * description field
   */
  @IsNotEmpty()
  @IsString()
  description: string;
}
