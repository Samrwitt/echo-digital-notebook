// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException, ConflictException } from '@nestjs/common';
import { UserService } from '../users/users.service'; // Update the path based on your actual structure
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await this.usersService.validatePassword(user, password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string): Promise<any> {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const newUser = await this.usersService.create(email, password);
    const { password: _, ...result } = newUser;
    return result;
  }

  async logout(userId: string): Promise<void> {
    // Perform any necessary logout logic (e.g., token invalidation, session cleanup)
    // You can customize this method based on your authentication strategy
    // For example: await this.someLogoutFunction(userId);
  }

  async getUser(userId: string): Promise<any> {
    const user = await this.usersService.findOneById(+userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.usersService.findOneById(+userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Perform any necessary cleanup or additional logic before deleting
    // For example: await this.somePreDeleteFunction(userId);

    // Delete the user
    await this.usersService.deleteUser(+userId);
  }
}
