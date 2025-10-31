import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate } from 'class-validator';
import { User } from '../../model/user.entity';

export class UpdateUserDto implements Partial<User> {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;
}
