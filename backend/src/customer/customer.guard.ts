

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '../user/user.entity';

@Injectable()
export class CustomerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; 

   
    return !!user && !!user.customer;
  }
}