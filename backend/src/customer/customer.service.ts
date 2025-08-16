import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './customer.dto';
import { UpdateCustomerDto } from './updateCustomer.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
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
}