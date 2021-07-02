import {
  IsNotEmpty, IsString, Max, Min,
} from 'class-validator';

export class CreateHotelDto {
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
