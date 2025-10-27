import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { SessionsService } from '../sessions/session.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sessionsService: SessionsService,
    private jwtService: JwtService,
  ) {}

  async requestOtp(phone: string): Promise<{ otp: string }> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.usersService.saveOtp(phone, otp);
    console.log(`OTP for ${phone}: ${otp}`);
    return { otp };
  }

  async verifyOtp(phone: string, otp: string, userAgent: string) {
    const isValid = await this.usersService.verifyOtp(phone, otp);
    if (!isValid) throw new UnauthorizedException('Invalid OTP');

    let user = await this.usersService.findByPhone(phone);
    const payload = { sub: user?.id, phone: user?.phone };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.sessionsService.createSession(user!.id, refreshToken, {
      userAgent,
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(sessionId: string, refreshToken: string) {
    const session = await this.sessionsService.validateRefreshToken(
      sessionId,
      refreshToken,
    );
    if (!session) throw new UnauthorizedException();

    const user = await this.usersService.getUserById(session.userId);
    const payload = { sub: user?.id, phone: user?.phone };

    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.sessionsService.createSession(user!.id, newRefreshToken, {
      userAgent: 'refreshed',
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(sessionId: string) {
    await this.sessionsService.revokeSession(sessionId);
  }
}
