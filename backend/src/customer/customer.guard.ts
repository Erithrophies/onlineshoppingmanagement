

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '../user/user.entity';

@Injectable()
export class CustomerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // This user object is from the JWT payload

    // Check if the user is linked to a customer record
    // The JwtStrategy must populate the 'customer' property on the user object
    return user && user.customer !== null;
  }
}