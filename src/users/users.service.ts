import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { createUserDto } from './dto/dtos';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async creteUser(userDto: createUserDto) {
    const candidate = await this.userRepository.findOne({
      where: { login: userDto.login },
    });

    if (candidate)
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.userRepository.create(userDto);

    return user;
  }

  async deleteUserById(userId: string) {
    const user = await this.userRepository.findByPk(userId);

    if (!user)
      throw new HttpException(
        'Пользователь не существует',
        HttpStatus.BAD_REQUEST,
      );

    if (user.destroy()) {
      return { message: 'Пользователь удален' };
    }
  }
}
