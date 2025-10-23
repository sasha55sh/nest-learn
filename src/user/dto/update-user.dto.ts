import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  DOB?: Date;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  lastOnlineAt?: Date;
}
