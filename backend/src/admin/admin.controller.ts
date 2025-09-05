import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from '../user/user.entity';
import { Seller } from '../seller/seller.entity';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';
import { Payment } from '../payment/payment.entity';
import { AdminRoleGuard } from './admin.roleguard';
import { CreateAdminDto } from './admin.dto';
import { Admin } from './admin.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { LoginDto } from '../auth/auth.dto'; // Assuming you have a LoginDto here
import { AuthService } from 'src/auth/auth.service';

@Controller('admin')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  
  ) {}

<<<<<<< HEAD
 
=======
  
>>>>>>> e3c4b1c805b5aaf48025f92640fee85fa84ea8d4
  @Post('register')
  async registerAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

<<<<<<< HEAD
  
=======

>>>>>>> e3c4b1c805b5aaf48025f92640fee85fa84ea8d4
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

<<<<<<< HEAD
  
=======
 
>>>>>>> e3c4b1c805b5aaf48025f92640fee85fa84ea8d4
  @Get('users')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAllAdmin(): Promise<Admin[]> {
    return this.adminService.findAllAdmin();
  }

<<<<<<< HEAD
  
=======

>>>>>>> e3c4b1c805b5aaf48025f92640fee85fa84ea8d4
  @Get('sellers')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAllSellers(): Promise<Seller[]> {
    return this.adminService.findAllSellers();
  }

<<<<<<< HEAD
  
=======

>>>>>>> e3c4b1c805b5aaf48025f92640fee85fa84ea8d4
  @Patch('seller/:id/status')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async updateSellerStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Seller> {
    const sellerId = Number(id);
    const seller = await this.adminService.updateSellerStatus(sellerId, status);
    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found.`);
    }
    return seller;
  }

  
  @Get('products')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAllProducts(): Promise<Product[]> {
    return this.adminService.findAllProducts();
  }

  
  @Delete('product/:id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    const result = await this.adminService.deleteProduct(id);
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return { message: `Product with ID ${id} has been deleted.` };
  }

<<<<<<< HEAD
  
=======
 
>>>>>>> e3c4b1c805b5aaf48025f92640fee85fa84ea8d4
  @Get('orders')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAllOrders(): Promise<Order[]> {
    return this.adminService.findAllOrders();
  }

<<<<<<< HEAD
  
=======

>>>>>>> e3c4b1c805b5aaf48025f92640fee85fa84ea8d4
  @Get('payments')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAllPayments(): Promise<Payment[]> {
    return this.adminService.findAllPayments();
  }

  
  @Delete('user/:id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    const result = await this.adminService.deleteUser(id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return { message: `User with ID ${id} has been deleted.` };
  }
}