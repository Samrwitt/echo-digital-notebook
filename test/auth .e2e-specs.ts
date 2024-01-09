/*/ auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
   // const user = await service.register('John Doe', 'john@example.com', 'password');
   // expect(user).toBeDefined();
   // expect(user.name).toEqual('John Doe');
    // Add more assertions based on your implementation
  });
});*/
