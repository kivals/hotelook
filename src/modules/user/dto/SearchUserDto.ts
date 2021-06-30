import { ISearchUserParams } from '../interfaces/ISearchUserParams';
import { IsEmail, IsNumber, IsOptional, Matches, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchUserDto implements ISearchUserParams {

  @IsOptional()
  contactPhone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Matches(/^[a-zA-ZА-Яа-я ]+$/)
  name?: string;

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @IsNumber()
  offset?: number;
}
