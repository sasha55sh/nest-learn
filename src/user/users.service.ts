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

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async updateUserById(
    id: number,
    updateDto: UpdateUserDto,
  ): Promise<User | null> {
    await this.usersRepository.update(id, updateDto);
    const updatedUser = await this.getUserById(id);
    return updatedUser;
  }

  async deleteUserById(id: number): Promise<number> {
    const result = await this.usersRepository.delete(id);
    return result.affected ?? 0;
  }
}
