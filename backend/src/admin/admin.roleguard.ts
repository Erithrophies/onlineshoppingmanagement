// admin.roleguard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user:User = request.user; 
    
    // Add debug logging
     console.log('User in AdminRoleGuard:', user);
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }
    
    if (user.admin) {
      // If the user has an 'admin' relation, they have the correct role.
      return true;
    }

    // If the check fails, throw the ForbiddenException.
    throw new ForbiddenException('Admin privileges required');
  }
}