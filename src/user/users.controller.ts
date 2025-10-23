import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: UserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(+id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUserById(
      +id,
      updateUserDto,
    );
    return updatedUser;
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    await this.userService.deleteUserById(+id);
    return `User with id: ${id} successfully deleted`;
  }
}
