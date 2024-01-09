// local-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    // Add your custom logic here, if needed, before calling the super's canActivate
    return super.canActivate(context);
  }
}
