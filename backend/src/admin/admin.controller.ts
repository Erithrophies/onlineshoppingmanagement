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

  // 1. PUBLIC ROUTE: Register the first admin
  // This is the unguarded route that you will use to bootstrap your system.
  @Post('register')
  async registerAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  // 2. PUBLIC ROUTE: Log in as an admin to get a JWT
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  // All subsequent routes are protected by guards applied at the method level.
  // This ensures that only logged-in admins can access them.

  // 3. GET /admin/users: View all users
  @Get('users')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAllUsers(): Promise<User[]> {
    return this.adminService.findAllUsers();
  }

  // 4. GET /admin/sellers: List all registered sellers
  @Get('sellers')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAllSellers(): Promise<Seller[]> {
    return this.adminService.findAllSellers();
  }

  // 5. PATCH /admin/seller/:id/status: Update seller status
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

  // 6. GET /admin/products: View all products
  @Get('products')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAllProducts(): Promise<Product[]> {
    return this.adminService.findAllProducts();
  }

  // 7. DELETE /admin/product/:id: Delete a product
  @Delete('product/:id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    const result = await this.adminService.deleteProduct(id);
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return { message: `Product with ID ${id} has been deleted.` };
  }

  // 8. GET /admin/orders: View all orders
  @Get('orders')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAllOrders(): Promise<Order[]> {
    return this.adminService.findAllOrders();
  }

  // 9. GET /admin/payments: View all payments
  @Get('payments')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAllPayments(): Promise<Payment[]> {
    return this.adminService.findAllPayments();
  }

  // 10. DELETE /admin/user/:id: Delete a user
  @Delete('user/:id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    const result = await this.adminService.deleteUser(id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return { message: `User with ID ${id} has been deleted.` };
  }
}