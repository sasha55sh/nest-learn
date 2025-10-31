import { Controller, Get, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { SessionsService } from './session.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMySessions(@Req() req) {
    return this.sessionsService.getUserSessions(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async revokeSession(@Param('id') id: string, @Req() req) {
    const sessions = await this.sessionsService.getUserSessions(
      req.user.userId,
    );
    const target = sessions.find((s) => s.id === id);
    if (!target) return { message: 'Session not found or not owned by user' };

    await this.sessionsService.revokeSession(id);
    return { message: 'Session revoked successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async revokeAll(@Req() req) {
    const userId = req.user.userId;
    const currentSessionId = req.user.sessionId;
    await this.sessionsService.revokeAllUserSessions(userId, currentSessionId);
    return { message: 'All sessions revoked' };
  }
}
