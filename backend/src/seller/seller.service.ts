// src/seller/seller.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './seller.entity';
import { CreateSellerDto } from './seller.dto';
import { UpdateSellerDto } from './updateSeller.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/product/product.entity';
import { CreateProductDto } from 'src/product/product.dto';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const passwordHash = await bcrypt.hash(createSellerDto.password, 10);
    const user = this.usersRepository.create({
      username: createSellerDto.username,
      passwordHash: passwordHash,
    });
    await this.usersRepository.save(user);

    const seller = this.sellersRepository.create({
      shopName: createSellerDto.shopName,
      email: createSellerDto.email,
      user: user,
    });
    return this.sellersRepository.save(seller);
  }

  async findByUserId(userId: number): Promise<Seller> {
    const seller = await this.sellersRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!seller) {
      throw new NotFoundException('Seller profile not found for this user.');
    }
    return seller;
  }

  async updateMyProfile(
    userId: number,
    updateSellerDto: UpdateSellerDto,
  ): Promise<Seller> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['seller'],
    });

    if (!user || !user.seller) {
      throw new NotFoundException('Seller profile not found.');
    }

    const updatedSeller = {
      ...user.seller,
      ...updateSellerDto,
    };

    return this.sellersRepository.save(updatedSeller);
  }

  async createProduct(userId: number, createProductDto: CreateProductDto): Promise<Product> {
    const seller = await this.sellersRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!seller) {
      throw new NotFoundException('Seller not found for this user.');
    }

    const newProduct = this.productsRepository.create({
      ...createProductDto,
      seller,
    });
    return this.productsRepository.save(newProduct);
  }

  async findProductsByUserId(userId: number): Promise<Product[]> {
    const seller = await this.sellersRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products'],
    });

    if (!seller) {
      throw new NotFoundException('Seller profile not found for this user.');
    }

    return seller.products;
  }
  
  async findProductsBySellerId(sellerId: number): Promise<Product[]> {
    const seller = await this.sellersRepository.findOne({
      where: { id: sellerId },
      relations: ['products'],
    });

    if (!seller) {
      throw new NotFoundException('Seller not found.');
    }

    return seller.products;
  }
}