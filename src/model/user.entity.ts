import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: true})
  email?: string;

  @Column({unique: true})
  phone: string

  @Column()
  userName: string;
  @Column()
  fullName: string;

  @Column()
  bio: string

  @Column()
  dateOfBirth: Date;

  @Column()
  lastOnlineAt: Date;
}
