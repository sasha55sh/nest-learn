import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/model/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: UserDto): Promise<User> {
    const userData = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(userData);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const userData = await this.usersRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User not found', 404);
    }
    return userData;
  }

  async updateUserById(id: number, updateDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateDto);
    const updatedUser = this.getUserById(id);
    return updatedUser;
  }

  async deleteUserById(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
