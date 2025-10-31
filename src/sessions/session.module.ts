import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../model/session.entity';
import { SessionsService } from './session.service';
import { SessionsController } from './session.controller';
import { User } from '../model/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, User]),
],
  providers: [SessionsService],
  controllers: [SessionsController],
  exports: [SessionsService],
})
export class SessionsModule {}
