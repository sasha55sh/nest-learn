import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  phone: string;

  @IsString()
  username: string;

  @IsString()
  fullName: string;

  @IsString()
  bio: string;

  @Type(() => Date)
  @IsDate()
  DOB: Date;

  @Type(() => Date)
  @IsDate()
  lastOnlineAt: Date;
}
