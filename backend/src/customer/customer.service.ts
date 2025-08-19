import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './customer.dto';
import { UpdateCustomerDto } from './updateCustomer.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/order/order.entity';
import { CreateOrderDto } from 'src/order/order.dto';
import { Product } from 'src/product/product.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 1. POST /customers
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const passwordHash = await bcrypt.hash(createCustomerDto.password, 10);
    const user = this.usersRepository.create({
      username: createCustomerDto.username,
      passwordHash: passwordHash,
    });
    await this.usersRepository.save(user);

    const customer = this.customersRepository.create({
      name: createCustomerDto.name,
      email: createCustomerDto.email,
      user: user,
    });
    return this.customersRepository.save(customer);
  }

  // 2. GET /customers
  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find({ relations: ['user'] });
  }

  // 3. GET /customers/:id
  async findOne(id: number): Promise<Customer | null> {
    return this.customersRepository.findOne({ where: { id }, relations: ['user'] });
  }

  // 4. PATCH /customers/:id
  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer | null> {
    const customer = await this.customersRepository.findOne({ where: { id } });
    if (!customer) {
      return null;
    }
    this.customersRepository.merge(customer, updateCustomerDto);
    return this.customersRepository.save(customer);
  }

  // 5. DELETE /customers/:id
  async remove(id: number): Promise<boolean> {
    const result = await this.customersRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  // 6. PUT /customers/:id
  async replace(id: number, createCustomerDto: CreateCustomerDto): Promise<Customer | null> {
    const customer = await this.customersRepository.findOne({ where: { id }, relations: ['user'] });
    if (!customer) {
      return null;
    }
    customer.name = createCustomerDto.name;
    customer.email = createCustomerDto.email;
    
    if (customer.user) {
      customer.user.username = createCustomerDto.username;
      customer.user.passwordHash = await bcrypt.hash(createCustomerDto.password, 10);
      await this.usersRepository.save(customer.user);
    }
    
    return this.customersRepository.save(customer);
  }

  // 7. GET /customers/count
  async countAll(): Promise<number> {
    return this.customersRepository.count();
  }

  // 8. GET /customers/search/:name
  async searchByName(name: string): Promise<Customer[]> {
    return this.customersRepository.find({
      where: { name: Like(`%${name}%`) },
      relations: ['user'],
    });
  }


  async findByUserId(userId: string): Promise<Customer> {
    const customer = await this.customersRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'], // Eager load the user relation to ensure it's found
    });
    if (!customer) {
      throw new NotFoundException('Customer profile not found for this user.');
    }
    return customer;
  }

    async createOrder(userId: string, createOrderDto): Promise<Order> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['customer'],
    });

    if (!user || !user.customer) {
      throw new NotFoundException('Customer not found for this user.');
    }

    // Step 1: Calculate totalPrice
    let totalPrice = 0;
    const itemsWithPrices = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.productRepository.findOne({
          where: { id: item.productId }
        });

        if (!product) {
          throw new NotFoundException(`Product with ID ${item.productId} not found.`);
        }

        const itemPrice = product.price * item.quantity;
        totalPrice += itemPrice;

        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      }),
    );
    
    // Step 2: Create a new order entity
    const newOrder = this.orderRepo.create({
      totalPrice: totalPrice, // Set the calculated price
      customer: user.customer,
      // You would also save the items here, but that's a separate step
    });

    // Step 3: Save the order to the database
    return this.orderRepo.save(newOrder);
  }
}