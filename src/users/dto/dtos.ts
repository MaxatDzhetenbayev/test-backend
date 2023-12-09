import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'max' })
  login: string;
  @ApiProperty({ example: '123' })
  password: string;
  @ApiProperty({ example: 'Максат' })
  name: string;
  @ApiProperty({ example: 'Джетенбаев' })
  surname: string;
}

export class createUserDto {
  @ApiProperty({ example: 'max', description: 'Логин пользователя' })
  login: string;
  @ApiProperty({ example: '123', description: 'Пароль пользователя' })
  password: string;
  @ApiProperty({ example: 'Максат', description: 'Имя пользователя' })
  name: string;
  @ApiProperty({ example: 'Джетенбаев', description: 'Фамилия пользователя' })
  surname: string;
}
