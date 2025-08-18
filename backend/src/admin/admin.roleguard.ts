// admin.roleguard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    
    // Add debug logging
     console.log('User in AdminRoleGuard:', user);
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }
    
    if (user.role !== 'admin') {
      throw new ForbiddenException('Admin privileges required');
    }
    
    return true;
  }
}