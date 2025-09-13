import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Query, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

 @Get()
async findAll(@Query('search') search?: string): Promise<Product[]> {
  return this.productService.findAll(search);
}

@Get(':id')
async findOne(@Param('id') id: number): Promise<Product> {
  return this.productService.findOne(id);
}
}