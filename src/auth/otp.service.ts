import { Injectable } from '@nestjs/common';
import { Otp } from 'src/model/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,

    private usersService: UsersService,
  ) {}

  async generateOtp(phone: string, ttlMinutes = 5): Promise<string> {
    const user = await this.usersService.findByPhone(phone);
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    const otpEntity = this.otpRepository.create({
      userId: user?.id,
      otp,
      expiresAt,
    });
    await this.otpRepository.save(otpEntity);

    return otp;
  }

  async verifyOtp(phone: string, otp: string): Promise<boolean> {
    const user = await this.usersService.findByPhone(phone);
    if (!user) return false;

    const otpEntity = await this.otpRepository.findOne({
      where: { userId: user.id, otp },
      order: { createdAt: 'DESC' },
    });

    if (!otpEntity) return false;
    if (otpEntity.expiresAt < new Date()) return false;

    await this.otpRepository.delete({ id: otpEntity.id });

    return true;
  }
}
