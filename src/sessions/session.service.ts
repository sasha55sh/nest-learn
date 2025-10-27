import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../model/session.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  async createSession(
    userId: number,
    refreshToken: string,
    data: Partial<Session>,
  ) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    const session = this.sessionsRepository.create({
      userId,
      refreshTokenHash,
      expiresAt: data.expiresAt,
      deviceType: data.deviceType,
      userAgent: data.userAgent,
      location: data.location,
      appVersion: data.appVersion,
      deviceBrowser: data.deviceBrowser,
      deviceOS: data.deviceOS,
      createdAt: new Date(),
    });

    return this.sessionsRepository.save(session);
  }

  async validateRefreshToken(
    sessionId: string,
    refreshToken: string,
  ): Promise<Session | null> {
    const session = await this.sessionsRepository.findOne({
      where: { id: sessionId, isActive: true },
      select: ['id', 'refreshTokenHash', 'userId'],
    });

    if (!session) return null;

    const isValid = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash,
    );
    return isValid ? session : null;
  }

  async revokeSession(id: string) {
    await this.sessionsRepository.update(id, {
      isActive: false,
      revokedAt: new Date(),
    });
  }

  async revokeAllUserSessions(userId: number) {
    await this.sessionsRepository.update(
      { userId },
      { isActive: false, revokedAt: new Date() },
    );
  }

  async getUserSessions(userId: number) {
    return this.sessionsRepository.find({
      where: { userId, isActive: true },
    });
  }
}
