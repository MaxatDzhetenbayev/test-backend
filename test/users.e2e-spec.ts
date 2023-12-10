import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../src/users/users.module';
import { INestApplication } from '@nestjs/common';
import { User } from '../src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';

describe('UserController 	(e2e) test', () => {
  let app: INestApplication;

  let createdUserId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: 'nest_db',
          models: [User],
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST) - создание пользователя', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        login: 'test_login',
        password: 'test_password',
        name: 'test_name',
        surname: 'test_surname',
      })
      .expect(201);

    const user = response.body;

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('login');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('surname');

    createdUserId = user.id;
  });

  it('/users (POST) - Проверка существующего пользователя', async () => {
    return await request(app.getHttpServer())
      .post('/users')
      .send({
        login: 'test_login',
        password: 'test_password2',
        name: 'test_name2',
        surname: 'test_surname2',
      })
      .expect(409)
      .expect((response) => {
        expect(response.body.message).toEqual(
          'Пользователь с таким логином уже существует',
        );
      });
  });

  it('/users (GET) - Получение всех пользователей', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    const user = response.body[0];

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('login');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('surname');
  });

  it('/users/:id (DELETE) - Удаление пользователя по его id', async () => {
    return await request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.message).toEqual('Пользователь удален');
      });
  });

  it('/users/:id (DELETE) - Удаление пользователя по несуществующему id', async () => {
    return await request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .expect(404)
      .expect((response) => {
        expect(response.body.message).toEqual(
          'Пользователь c таким id не существует',
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
