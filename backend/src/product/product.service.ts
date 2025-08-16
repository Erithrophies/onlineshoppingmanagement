import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './product.dto';
import { Seller } from '../seller/seller.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const seller = await this.sellersRepository.findOne({ where: { id: createProductDto.sellerId } });
     if (!seller) {
      throw new HttpException(`Seller with ID ${createProductDto.sellerId} not found`, HttpStatus.NOT_FOUND);
    }
    const product = this.productsRepository.create({
      ...createProductDto,
      seller,
    });
    return this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
}