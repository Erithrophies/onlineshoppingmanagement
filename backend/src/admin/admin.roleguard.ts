
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user:User = request.user; 
    
   
     console.log('User in AdminRoleGuard:', user);
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }
    
    if (user.admin) {
      
      return true;
    }

    
    throw new ForbiddenException('Admin privileges required');
  }
}