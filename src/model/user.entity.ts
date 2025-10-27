import { Session } from './session.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  userName?: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  lastOnlineAt?: Date;

  @Column({ nullable: true })
  hashedPassword?: string;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
