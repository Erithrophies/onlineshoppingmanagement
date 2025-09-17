

// src/admin/admin.service.ts

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
import { CreateProductDto } from 'src/product/product.dto';
import { UpdateProductDto } from 'src/product/updateProduct.dto';
import { PusherService } from 'src/pusher/pusher.service';
import { JwtService } from '@nestjs/jwt';


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
    private readonly pusherService: PusherService, // <--- NEW INJECTION
    private readonly mailService: MailService, 
  ) {}



  async findOneByUserId(userId: number): Promise<Admin | null> {
    return this.adminRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  
  async countAdmins(): Promise<number> {
    return this.adminRepo.count();
  }

  async create(createAdminDto: any): Promise<any> { // Use your actual DTO type
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createAdminDto.password, salt);

    const user = this.userRepo.create({
      username: createAdminDto.username,
      passwordHash,
    });

    try {
      await this.userRepo.save(user);

      const admin = this.adminRepo.create({
        name: createAdminDto.name,
        email: createAdminDto.email,
        user: user,
      });

      const newAdmin = await this.adminRepo.save(admin);

  await this.pusherService.sendAdminNotification(
  'New Admin Added',
  `Admin '${createAdminDto.username}' was added successfully.`,
  '/admin/users'
  );




    await this.mailService.sendRegistrationMail(admin.email, admin.name);

    return this.adminRepo.save(admin);
     return newAdmin;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Username or Email already exists.');
      }
      throw error;
    }
  }

  

  
  async findAllAdmin(): Promise<Admin[]> {
    return this.adminRepo.find({ relations: ['user'] }); 
  }

  async findAllSellers(): Promise<Seller[]> {
    return this.sellerRepo.find();
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepo.find({ relations: ['customer'] });
  }

  async findAllPayments(): Promise<Payment[]> {
    return this.paymentRepo.find({ relations: ['order'] });
  }


  async updateSellerStatus(id: number, status: string): Promise<Seller> {
    const seller = await this.sellerRepo.findOne({ where: { id } });
    if (!seller) {
      throw new NotFoundException('Seller with ID not found');
    }
    seller.status = status as 'pending' | 'approved' | 'rejected'; 
    return this.sellerRepo.save(seller);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const seller = await this.sellerRepo.findOne({ 
      where: { id: createProductDto.sellerId },
      relations: ['user']
    });
    
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    
    const product = this.productRepo.create({
      ...createProductDto,
      seller,
    });
    
    return this.productRepo.save(product);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
    const product = await this.productRepo.findOne({ 
      where: { id: Number(id) },
      relations: ['seller']
    });
    
    if (!product) {
      return null;
    }
    
    // If sellerId is provided, update the seller relation
    if (updateProductDto.sellerId) {
      const seller = await this.sellerRepo.findOne({ 
        where: { id: updateProductDto.sellerId },
        relations: ['user']
      });
      
      if (!seller) {
        throw new NotFoundException('Seller not found');
      }
      product.seller = seller;
    }
    
    // Update other fields
    if (updateProductDto.name) product.name = updateProductDto.name;
    if (updateProductDto.description) product.description = updateProductDto.description;
    if (updateProductDto.price) product.price = updateProductDto.price;
    
    return this.productRepo.save(product);
  }

  
  async deleteProduct(id: string): Promise<boolean> {
    const result = await this.productRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  
  async deleteUser(id: number): Promise<boolean> {
    const result = await this.adminRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
