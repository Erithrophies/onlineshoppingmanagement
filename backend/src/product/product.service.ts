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
      throw new HttpException('Seller with ID ${createProductDto.sellerId} not found', HttpStatus.NOT_FOUND);
    }
    const product = this.productsRepository.create({
      ...createProductDto,
      seller,
    });
    return this.productsRepository.save(product);
  }

  async findAll(search?: string): Promise<Product[]> {
  const query = this.productsRepository.createQueryBuilder('product')
    .leftJoinAndSelect('product.seller', 'seller'); // join seller info

  if (search) {
    query.where('product.name LIKE :search', { search: `%${search}%` });
  }

  return query.getMany();
}

async findOne(id: number): Promise<Product> {
  const product = await this.productsRepository.findOne({
    where: { id },
    relations: ['seller'], // include seller info
  });

  if (!product) {
    throw new HttpException(`Product with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }

  return product;
}
}