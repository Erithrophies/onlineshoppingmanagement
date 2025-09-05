import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '../user/user.entity';

@Injectable()
export class SellerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; 

    // Return true if the user exists and has a seller profile
    return user && user.seller !== null;
  }
}