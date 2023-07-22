import {
  IsEmail,
  IsString,
  IsISO8601,
  IsNotEmpty,
  IsEnum,
  MinLength,
} from 'class-validator';

import { User_Gender_Enum } from '../types';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  nameFirst: string;

  @IsString()
  @MinLength(1)
  nameLast: string;

  @IsISO8601()
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(User_Gender_Enum)
  gender: User_Gender_Enum;
}
