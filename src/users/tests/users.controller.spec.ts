import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { createUserDto } from '../dto/dtos';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    createUser: jest.fn((dto: createUserDto) => {
      return { id: Date.now(), ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('users', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    const createDto = {
      login: 'test_login',
      password: 'test_password',
      name: 'test_name',
      surname: 'test_surname',
    };

    it('should create user', () => {
      expect(controller.create(createDto)).toEqual({
        id: expect.any(Number),
        ...createDto,
      });
    });
  });
});
