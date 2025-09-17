// src/customer/customer.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  UseGuards,
  ParseIntPipe,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './customer.dto';
import { UpdateCustomerDto } from './updateCustomer.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { AdminRoleGuard } from 'src/admin/admin.roleguard';
import { CustomerGuard } from './customer.guard';
import { Order } from 'src/order/order.entity';
import { Payment } from 'src/payment/payment.entity';
import { CreatePaymentDto } from 'src/payment/payment.dto';
import { OrderWithStatus } from './customer.service'; 

// @UseGuards(JwtAuthGuard, CustomerGuard)
@Controller('customers')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Get('my-profile')
  @UseGuards(JwtAuthGuard, CustomerGuard) // Correct: customer-only access
  async getMyProfile(@Req() req): Promise<Customer> {
    console.log('Request.user in controller:', req.user);
    const user = req.user;
    return this.customerService.findByUserId(user.id);
  }

  @Post('orders')
  @UseGuards(JwtAuthGuard, CustomerGuard) // Correct: customer-only access
  async createOrder(@Req() req, @Body() createOrderDto): Promise<Order> {
    const user = req.user;
    return this.customerService.createOrder(user.id, createOrderDto);
  }

  @Get('my-orders')
  @UseGuards(JwtAuthGuard, CustomerGuard) // Correct: customer-only access
  async getMyOrders(@Req() req): Promise<OrderWithStatus[]> {
    const user = req.user;
    console.log("I AM IN THE MY-ORDERS ROUTE!");
    return this.customerService.findOrdersByUserId(user.id);
  }

    @Get('my-orders/total')
@UseGuards(JwtAuthGuard, CustomerGuard)
async getMyOrdersTotal(@Req() req): Promise<{ total: number }> {
  const user = req.user;
  const total = await this.customerService.calculateOrderTotal(user.id);
  return { total };
}

  @Get('my-orders/:id')
@UseGuards(JwtAuthGuard, CustomerGuard)
async getMyOrder(@Req() req, @Param('id', ParseIntPipe) id: number): Promise<Order> {
  const user = req.user;
  return this.customerService.findOrderById(user.id, id);
}

@Delete('my-orders/:id/cancel')
@UseGuards(JwtAuthGuard, CustomerGuard)
async cancelMyOrder(
  @Req() req,
  @Param('id', ParseIntPipe) id: number,
): Promise<{ message: string }> {
  const user = req.user;

  try {
    await this.customerService.cancelOrder(user.id, id);
    return { message: `Order ${id} has been successfully canceled.` };
  } catch (error) {
    if (error instanceof NotFoundException || error instanceof BadRequestException) {
      throw error;
    }
    throw new BadRequestException('Unable to cancel the order.');
  }
}

  @Get('my-payments')
@UseGuards(JwtAuthGuard, CustomerGuard)
async getMyPayments(@Req() req): Promise<Payment[]> {
  const user = req.user;
  return this.customerService.findPaymentsByUserId(user.id);
}

@Post('my-orders/:id/pay')
  @UseGuards(JwtAuthGuard, CustomerGuard)
  async payOrder(
    @Req() req,
    @Body() createPaymentDto: CreatePaymentDto, // includes amount, paymentMethod
  ) {
    const user = req.user;
    const orderId = Number(req.params.id);

    try {
      const payment = await this.customerService.makePayment(user.id, {
        ...createPaymentDto,
        orderId,
      });
      return { message: 'Payment successful', payment };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Unable to process payment.');
    }
  }

  @Patch('my-profile')
  @UseGuards(JwtAuthGuard, CustomerGuard)
  async updateMyProfile(
    @Req() req,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const user = req.user;
    const updatedCustomer = await this.customerService.updateMyProfile(
      user.id,
      updateCustomerDto,
    );
    return updatedCustomer;
  }



  @Get()
  @UseGuards(JwtAuthGuard, AdminRoleGuard) // Correct: admin-only access
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get('count')
  @UseGuards(JwtAuthGuard, AdminRoleGuard) // Correct: admin-only access
  async countAll(): Promise<{ count: number }> {
    const count = await this.customerService.countAll();
    return { count };
  }

  @Get('search/:name')
  @UseGuards(JwtAuthGuard, AdminRoleGuard) // Correct: admin-only access
  async searchByName(@Param('name') name: string): Promise<Customer[]> {
    return this.customerService.searchByName(name);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard) // Correct: admin-only access
  async findOne(@Param('id') id: number): Promise<Customer> {
    const customer = await this.customerService.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard) // Correct: admin-only access
  async update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerService.update(id, updateCustomerDto);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard) // Correct: admin-only access
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const result = await this.customerService.remove(id);
    if (!result) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return { message: `Customer with ID ${id} has been deleted.` };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard) // Correct: admin-only access
  async replace(
    @Param('id') id: number,
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerService.replace(id, createCustomerDto);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }
}