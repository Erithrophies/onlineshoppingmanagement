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
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from '../user/user.entity';
import { Seller } from '../seller/seller.entity';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';
import { Payment } from '../payment/payment.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AdminRoleGuard } from './admin.roleguard';
import { CreateAdminDto } from './admin.dto';
import { Admin } from './admin.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Request } from 'express';




@Controller('admin')
// @UseGuards(JwtAuthGuard, AdminRoleGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Req() req: Request
  ): Promise<Admin> {
    // Check if any admin exists
    const adminCount = await this.adminService.countAdmins();
    if (adminCount > 0) {
      // Require authentication and admin role for subsequent admin creation
      // Manually check for user and role
      const user = req.user as any;
      if (!user) {
        throw new ForbiddenException('Authentication required');
      }
      if (user.role !== 'admin') {
        throw new ForbiddenException('Admin privileges required');
      }
    }
    return this.adminService.create(createAdminDto);
  }


   // 1. GET /admin/users: View all users
    @Get('users')
  // @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async getAllUsers(): Promise<User[]> {
    return this.adminService.findAllUsers();
  }

  

  // 2. GET /admin/sellers: List all registered sellers
  @Get('sellers')
  async getAllSellers(): Promise<Seller[]> {
    return this.adminService.findAllSellers();
  }

  // 3. PATCH /admin/seller/:id/status: Update seller status
  @Patch('seller/:id/status')
  async updateSellerStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Seller> {
    const sellerId = Number(id);
    const seller = await this.adminService.updateSellerStatus(sellerId, status);
    if (!seller) {
      throw new NotFoundException('Seller with ID ${id} not found.');
    }
    return seller;
  }

  // 4. GET /admin/products: View all products
  @Get('products')
  async getAllProducts(): Promise<Product[]> {
    return this.adminService.findAllProducts();
  }

  // 5. DELETE /admin/product/:id: Delete a product
  @Delete('product/:id')
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    const result = await this.adminService.deleteProduct(id);
    if (!result) {
      throw new NotFoundException('Product with ID ${id} not found.');
    }
    return { message: 'Product with ID ${id} has been deleted.' };
  }

  // 6. GET /admin/orders: View all orders
  @Get('orders')
  async getAllOrders(): Promise<Order[]> {
    return this.adminService.findAllOrders();
  }

  // 7. GET /admin/payments: View all payments
  @Get('payments')
  async getAllPayments(): Promise<Payment[]> {
    return this.adminService.findAllPayments();
  }

  // 8. DELETE /admin/user/:id: Delete a user
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    const result = await this.adminService.deleteUser(id);
    if (!result) {
      throw new NotFoundException('User with ID ${id} not found.');
    }
    return { message: 'User with ID ${id} has been deleted.'};
  }
}







































// import { Controller, Post, Body, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
// import { AdminService } from './admin.service';
// import { Admin } from './admin.entity';
// import { CreateAdminDto } from './admin.dto';
 
 
// @Controller('admin')
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}
 
//   @Post()
//   @UsePipes(new ValidationPipe())
//   async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
//     return this.adminService.create(createAdminDto);
//   }
  
//   @Get(':id')
//   async findOne(@Param('id') id: number): Promise<Admin> {
//     return this.adminService.findOne(id);
//   }
// }
 




//  import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
// import { AdminService } from './admin.service';
// import { CreateAdminDto } from './admin.dto';
// import { Admin } from './admin.entity';

// @Controller('admin')
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}

//   @Post('createadmin')
//   @UsePipes(new ValidationPipe())
//   createAdmin(@Body() dto: CreateAdminDto): Promise<Admin> {
//     return this.adminService.createAdmin(dto);
//   }

//   @Patch('updateCountry/:id')
//   updateCountry(@Param('id', ParseIntPipe) id: number,@Body('country') country: string): Promise<Admin> {
//     return this.adminService.updateCountry(id, country);
//   }

//   @Get('byDate/:date')
//   getByJoiningDate(@Param('date') date: string): Promise<Admin[]> {
//     return this.adminService.getByJoiningDate(date);
//   }

//   @Get('unknownCountry')
//   getByUnknownCountry(): Promise<Admin[]> {
//     return this.adminService.getByUnknownCountry();
//   }
// }


































// import { Controller,Get,Param,Body,Post,Query, Delete, UsePipes, ValidationPipe, ParseIntPipe } from "@nestjs/common";    
// import { AdminService } from './admin.service';
// import { CreateAdminDto } from "./admin.dto";

// @Controller('admin')
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}

//   @Get()
//     getAdminInfo(): string {
//         return this.adminService.getAdminInfo();
//     }


//     @Get('all')
//     getAdmin(){
//         return this.adminService.getAdmin();
//     }

//     @Get('Photo/:id')
//     getPhotobyid(@Param('id',ParseIntPipe) photoid: number) {    
//         return this.adminService.getPhotobyid(photoid);
//     } 
    
//     @Get('getadmin')
//     getAdminbyNameandID(@Query('name') name:string ,@Query('id') id:number): object {

//         return this.adminService.getAdminByNameandID(name,id);
//     }

//     @Post("addadmin")
//     @UsePipes(new ValidationPipe())
//        addAdmin(@Body() admindata: CreateAdminDto): object {
//        return this.adminService.addAdmin(admindata);
//    }

//     @Delete('deleteAdmin/:id') 
//        deleteAdmin(@Param('id') id: number): string { 
//            return this.adminService.deleteAdmin(id); 
//        }
   
// }