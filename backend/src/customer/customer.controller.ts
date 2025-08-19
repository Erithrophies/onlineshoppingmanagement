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
  Req,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './customer.dto';
import { UpdateCustomerDto } from './updateCustomer.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { AdminRoleGuard } from 'src/admin/admin.roleguard';
import { CustomerGuard } from './customer.guard';
import { Order } from 'src/order/order.entity';

@Controller('customers')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // 1. POST /customers: Create a new customer
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

    // GET /customers/my-profile
@Get('my-profile')
@UseGuards(JwtAuthGuard, CustomerGuard)
async getMyProfile(@Req() req): Promise<Customer> {
  const user = req.user;
  return this.customerService.findByUserId(user.id);
}

// POST /customers/orders
@Post('orders')
@UseGuards(JwtAuthGuard, CustomerGuard)
async createOrder(@Req() req, @Body() createOrderDto): Promise<Order> {
  const user = req.user;
  return this.customerService.createOrder(user.id, createOrderDto);
}



  // 2. GET /customers: Get all customers
  @Get()
  @UseGuards(JwtAuthGuard,AdminRoleGuard )
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  // 3. GET /customers/count: Get the total number of customers
  // THIS ROUTE IS NOW ABOVE THE DYNAMIC :id ROUTE
  @Get('count')
  @UseGuards(JwtAuthGuard,AdminRoleGuard )
  async countAll(): Promise<{ count: number }> {
    const count = await this.customerService.countAll();
    return { count };
  }

  // 4. GET /customers/search/:name: Search for customers by name
  // THIS ROUTE IS ALSO ABOVE THE DYNAMIC :id ROUTE
  @Get('search/:name')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async searchByName(@Param('name') name: string): Promise<Customer[]> {
    return this.customerService.searchByName(name);
  }

  // 5. GET /customers/:id: Get a single customer by ID
  // THIS MUST BE THE LAST ROUTE WITH A DYNAMIC PARAMETER
  @Get(':id')
  @UseGuards(JwtAuthGuard,AdminRoleGuard )
  async findOne(@Param('id') id: number): Promise<Customer> {
    const customer = await this.customerService.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }

  // 6. PATCH /customers/:id: Partially update a customer by ID
  @Patch(':id')
  @UseGuards(JwtAuthGuard,AdminRoleGuard )
  async update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerService.update(id, updateCustomerDto);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }

  // 7. DELETE /customers/:id: Delete a customer by ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard,AdminRoleGuard )
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const result = await this.customerService.remove(id);
    if (!result) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return { message: `Customer with ID ${id} has been deleted.` };
  }

  // 8. PUT /customers/:id: Fully update a customer by ID
  @Put(':id')
  @UseGuards(JwtAuthGuard,AdminRoleGuard )
  async replace(@Param('id') id: number, @Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.customerService.replace(id, createCustomerDto);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }


}