import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Otp } from '../model/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { UsersService } from '../user/users.service';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
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

  async verifyOtp(otp: string): Promise<{ valid: boolean; userId?: number }> {
    const otpEntity = await this.otpRepository.findOne({
      where: { otp },
      order: { createdAt: 'DESC' },
    });

    if (!otpEntity || otpEntity.expiresAt < new Date()) {
      return { valid: false };
    }

    await this.otpRepository.delete({ id: otpEntity.id });

    return { valid: true, userId: otpEntity.userId };
  }
}
