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
import { OrderDetails } from 'src/order/order-details.entity';
import { Payment } from 'src/payment/payment.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepo: Repository<OrderDetails>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
     @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
  ) {}
  
  
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

  
  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find({ relations: ['user'] });
  }

  
  async findOne(id: number): Promise<Customer | null> {
    return this.customersRepository.findOne({ where: { id }, relations: ['user'] });
  }

  
  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer | null> {
    const customer = await this.customersRepository.findOne({ where: { id } });
    if (!customer) {
      return null;
    }
    this.customersRepository.merge(customer, updateCustomerDto);
    return this.customersRepository.save(customer);
  }

   async updateMyProfile(userId: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['customer'],
    });

    if (!user || !user.customer) {
      throw new NotFoundException('Customer profile not found.');
    }

    // Update the customer's profile with the new data
    const updatedCustomer = {
      ...user.customer,
      ...updateCustomerDto,
    };

    return this.customersRepository.save(updatedCustomer);
  }

  
  async remove(id: number): Promise<boolean> {
    const result = await this.customersRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

 
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

 
  async countAll(): Promise<number> {
    return this.customersRepository.count();
  }

  
  async searchByName(name: string): Promise<Customer[]> {
    return this.customersRepository.find({
      where: { name: Like(`%${name}%`) },
      relations: ['user'],
    });
  }


  async findByUserId(userId: number): Promise<Customer> {
    const customer = await this.customersRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'], // Eager load the user relation to ensure it's found
    });
    if (!customer) {
      throw new NotFoundException('Customer profile not found for this user.');
    }
    return customer;
  }

   async createOrder(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['customer'],
    });

    if (!user || !user.customer) {
      throw new NotFoundException('Customer not found for this user.');
    }

    // 1. Create and save the main order object first
    const newOrder = this.orderRepo.create({
      customer: user.customer,
      totalPrice: 0, // Temporarily set to 0, will be updated later
    });
    const savedOrder = await this.orderRepo.save(newOrder);

    let totalPrice = 0;
    const orderDetailsPromises = createOrderDto.items.map(async (itemDto) => {
      const product = await this.productRepository.findOne({
        where: { id: itemDto.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${itemDto.productId} not found.`);
      }

      const orderDetail = this.orderDetailsRepo.create({
        order: savedOrder,
        product: product,
        quantity: itemDto.quantity,
        priceAtTime: product.price, // Save the price at the time of purchase
      });

      totalPrice += product.price * itemDto.quantity;
      return this.orderDetailsRepo.save(orderDetail);
    });

    // 2. Wait for all order details to be saved
    await Promise.all(orderDetailsPromises);

    // 3. Update the total price on the order
    savedOrder.totalPrice = totalPrice;
    return this.orderRepo.save(savedOrder);
  }

   async findOrdersByUserId(userId: number): Promise<Order[]> {
    const customer = await this.customersRepository.findOne({
      where: { user: { id: userId } },
      relations: ['orders'],
    });

    if (!customer) {
      throw new NotFoundException('Customer profile not found for this user.');
    }

    return customer.orders;
  }

   async findPaymentsByUserId(userId: number): Promise<Payment[]> {
    const customer = await this.customersRepository.findOne({
      where: { user: { id: userId } },
      relations: ['payments'], // Assuming your Customer entity has a 'payments' relation
    });

    if (!customer) {
      throw new NotFoundException('Customer profile not found for this user.');
    }

    return customer.payments;
  }

    async calculateOrderTotal(userId: number): Promise<number> {
    const orders = await this.findOrdersByUserId(userId);
    return orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  }

   async findOrderById(userId: number, orderId: number): Promise<Order> {
  const order = await this.orderRepo.findOne({
    where: { id: orderId, customer: { user: { id: userId } } },
    relations: ['orderDetails', 'orderDetails.product'], // to see items inside
  });
  if (!order) {
    throw new NotFoundException(`Order ${orderId} not found for this customer.`);
  }
  return order;
}
}