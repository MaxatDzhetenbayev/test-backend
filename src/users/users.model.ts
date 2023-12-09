import { Table, Model, Column } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttributes {
  login: string;
  password: string;
  name: string;
  surname: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({ example: 'max', description: 'Логин пользователя' })
  @Column({ allowNull: false, unique: true })
  login: string;

  @ApiProperty({ example: '123', description: 'Пароль пользователя' })
  @Column
  password: string;

  @ApiProperty({ example: 'Максат', description: 'Имя пользователя' })
  @Column({ allowNull: false, unique: true })
  name: string;

  @ApiProperty({ example: 'Джетенбаев', description: 'Фамилия пользователя' })
  @Column
  surname: string;
}
