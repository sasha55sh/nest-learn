import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class OtpService {
  private otpStore = new Map<string, { otp: string; expiresAt: number }>();

  generateOtp(phone: string) {
    const otp = crypto.randomInt(100000, 999999).toString();
    this.otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
    return otp;
  }

  verifyOtp(phone: string, otp: string) {
    const record = this.otpStore.get(phone);
    if (!record) return false;
    if (Date.now() > record.expiresAt) return false;
    return record.otp === otp;
  }
}
