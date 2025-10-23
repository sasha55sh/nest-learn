import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate } from 'class-validator';
import { User } from 'src/model/user.entity';

export class UserDto implements Partial<User> {
  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  phone: string;

  @IsString()
  userName: string;

  @IsString()
  fullName: string;

  @IsString()
  bio: string;

  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @Type(() => Date)
  @IsDate()
  lastOnlineAt: Date;
}
