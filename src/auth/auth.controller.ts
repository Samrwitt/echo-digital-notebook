// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string) {
    const result = await this.authService.register(email, password);
    return { message: 'Registration successful', user: result };
  }

  @UseGuards(/* Add appropriate guard for logout if needed */)
  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.id);
    return { message: 'Logout successful' };
  }

  @UseGuards(/* Add appropriate guard for getting user details if needed */)
  @Get('user')
  async getUser(@Request() req) {
    const user = await this.authService.getUser(req.user.id);
    return { user };
  }

  @UseGuards(/* Add appropriate guard for deleting a user if needed */)
  @Delete('user')
  async deleteUser(@Request() req) {
    await this.authService.deleteUser(req.user.id);
    return { message: 'User deleted successfully' };
  }
}
