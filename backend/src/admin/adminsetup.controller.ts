

import { Controller, Post, Body, ForbiddenException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './admin.dto';
import { Admin } from './admin.entity';

@Controller('adminsetup')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AdminSetupController {
  constructor(private readonly adminService: AdminService) {}

  @Post('first')
  async createFirstAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    const adminCount = await this.adminService.countAdmins();
    if (adminCount > 0) {
      throw new ForbiddenException('The first admin has already been created.');
    }
    return this.adminService.create(createAdminDto);
  }
}