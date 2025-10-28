import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Otp } from 'src/model/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
