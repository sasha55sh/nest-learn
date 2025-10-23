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
  username: string;

  @Column()
  fullName: string;

  @Column()
  bio: string

  @Column()
  DOB: Date;

  @Column()
  lastOnlineAt: Date;
}
