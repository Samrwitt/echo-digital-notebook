// src/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom logic here, if needed, before calling the parent canActivate method
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on custom conditions if the authentication fails
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
