import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/users.module';
import { Session } from './model/session.entity';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/session.module';
import { Otp } from './model/otp.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Session, Otp],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    SessionsModule,
  ],
})
export class AppModule {}
