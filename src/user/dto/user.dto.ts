import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate } from 'class-validator';
import { User } from 'src/model/user.entity';

export class UserDto implements Partial<User> {
  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastOnlineAt?: Date;
}
