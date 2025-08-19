import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Seller } from '../seller/seller.entity';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';
import { Payment } from '../payment/payment.entity';
import { CreateAdminDto } from './admin.dto';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Seller) private sellerRepo: Repository<Seller>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
  ) {}

  // Method to count existing admins (used by the initial setup route)
  async countAdmins(): Promise<number> {
    return this.adminRepo.count();
  }

  // Method to create a new admin and their associated user
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createAdminDto.password, salt);

    const user = this.userRepo.create({
      username: createAdminDto.username,
      passwordHash,
    });

    await this.userRepo.save(user);

    const admin = this.adminRepo.create({
      name: createAdminDto.name,
      email: createAdminDto.email,
      user,
    });

    return this.adminRepo.save(admin);
  }

  // 1. Get all users
  async findAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  // 2. Get all sellers
  async findAllSellers(): Promise<Seller[]> {
    return this.sellerRepo.find();
  }

  // 3. Update seller status
  async updateSellerStatus(id: number, status: string): Promise<Seller> {
    const seller = await this.sellerRepo.findOne({ where: { id } });
    if (!seller) {
      throw new NotFoundException('Seller with ID not found');
    }
    seller.status = status;
    return this.sellerRepo.save(seller);
  }

  // 4. Get all products
  async findAllProducts(): Promise<Product[]> {
    return this.productRepo.find();
  }

  // 5. Delete a product
  async deleteProduct(id: string): Promise<boolean> {
    const result = await this.productRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  // 6. Get all orders
  async findAllOrders(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  // 7. Get all payments
  async findAllPayments(): Promise<Payment[]> {
    return this.paymentRepo.find();
  }

  // 8. Delete a user
  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}