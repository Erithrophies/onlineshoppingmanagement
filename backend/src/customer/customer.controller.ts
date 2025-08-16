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
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './customer.dto';
import { UpdateCustomerDto } from './updateCustomer.dto';

@Controller('customers')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // 1. POST /customers: Create a new customer
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  // 2. GET /customers: Get all customers
  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  // 3. GET /customers/count: Get the total number of customers
  // THIS ROUTE IS NOW ABOVE THE DYNAMIC :id ROUTE
  @Get('count')
  async countAll(): Promise<{ count: number }> {
    const count = await this.customerService.countAll();
    return { count };
  }

  // 4. GET /customers/search/:name: Search for customers by name
  // THIS ROUTE IS ALSO ABOVE THE DYNAMIC :id ROUTE
  @Get('search/:name')
  async searchByName(@Param('name') name: string): Promise<Customer[]> {
    return this.customerService.searchByName(name);
  }

  // 5. GET /customers/:id: Get a single customer by ID
  // THIS MUST BE THE LAST ROUTE WITH A DYNAMIC PARAMETER
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Customer> {
    const customer = await this.customerService.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }

  // 6. PATCH /customers/:id: Partially update a customer by ID
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerService.update(id, updateCustomerDto);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }

  // 7. DELETE /customers/:id: Delete a customer by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const result = await this.customerService.remove(id);
    if (!result) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return { message: `Customer with ID ${id} has been deleted.` };
  }

  // 8. PUT /customers/:id: Fully update a customer by ID
  @Put(':id')
  async replace(@Param('id') id: number, @Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.customerService.replace(id, createCustomerDto);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }
}