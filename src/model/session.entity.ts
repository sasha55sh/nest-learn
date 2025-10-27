import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

export enum DeviceType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  WEB = 'web',
  OTHER = 'other',
}

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  userId: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date | null;

  @Column({ type: 'enum', enum: DeviceType, default: DeviceType.OTHER })
  deviceType: DeviceType;

  @Column({ nullable: true })
  deviceOS: string;

  @Column({ nullable: true })
  deviceBrowser: string;

  @Column({ nullable: true })
  appVersion: string;

  @Column({ type: 'json', nullable: true })
  location: Record<string, string>;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  revokedAt: Date ;

  @Column({ nullable: true })
  revokedBy: number;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ type: 'int', default: 0 })
  refreshCount: number;

  @Column({ nullable: true, select: false })
  refreshTokenHash: string;

  @Column({nullable: true})
  refreshToken?: string;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  user: User;
}
