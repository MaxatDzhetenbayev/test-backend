import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, createUserDto } from './dto/dtos';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Получен список пользователей',
    type: [UserDto],
  })
  @Get()
  getAll(): Promise<UserDto[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь создан', type: User })
  @Post()
  create(@Body() userDto: createUserDto) {
    return this.usersService.createUser(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь удален' })
  @Delete(':id')
  delete(@Param('id') userId: string) {
    return this.usersService.deleteUserById(userId);
  }
}
