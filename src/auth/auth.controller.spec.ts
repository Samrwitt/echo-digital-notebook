/*/ auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {})}
  /* const user = await controller.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });
    expect(user).toBeDefined();
    // Add more assertions based on your implementation
  });
});*/
