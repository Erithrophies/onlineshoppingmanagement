import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
import { MailService } from './mail.service';

@Injectable()
export class AdminService {
  findAllUsers(): Admin[] | PromiseLike<Admin[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Seller) private sellerRepo: Repository<Seller>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    private readonly mailService: MailService, 
  ) {}

  
  async countAdmins(): Promise<number> {
    return this.adminRepo.count();
  }

 
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

    await this.mailService.sendRegistrationMail(admin.email, admin.name);

    return this.adminRepo.save(admin);
  }

  
  async findAllAdmin(): Promise<Admin[]> {
    return this.adminRepo.find();
  }

  
  async findAllSellers(): Promise<Seller[]> {
    return this.sellerRepo.find();
  }

  
  async updateSellerStatus(id: number, status: string): Promise<Seller> {
    const seller = await this.sellerRepo.findOne({ where: { id } });
    if (!seller) {
      throw new NotFoundException('Seller with ID not found');
    }
    seller.status = status;
    return this.sellerRepo.save(seller);
  }

  
  async findAllProducts(): Promise<Product[]> {
    return this.productRepo.find();
  }

  
  async deleteProduct(id: string): Promise<boolean> {
    const result = await this.productRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  
  async findAllOrders(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  
  async findAllPayments(): Promise<Payment[]> {
    return this.paymentRepo.find();
  }



  async deleteUser(id: number): Promise<boolean> {
    const result = await this.adminRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}