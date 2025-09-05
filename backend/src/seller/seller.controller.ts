// src/seller/seller.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { Seller } from './seller.entity';
import { CreateSellerDto } from './seller.dto';
import { UpdateSellerDto } from './updateSeller.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { SellerGuard } from './seller.guard';
import { Product } from 'src/product/product.entity';

@Controller('sellers')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  async create(@Body() createSellerDto: CreateSellerDto): Promise<Seller> {
    return this.sellerService.create(createSellerDto);
  }

  @Get('my-profile')
  @UseGuards(JwtAuthGuard, SellerGuard)
  async getMyProfile(@Req() req): Promise<Seller> {
    const user = req.user;
    return this.sellerService.findByUserId(user.id);
  }

  @Patch('my-profile')
  @UseGuards(JwtAuthGuard, SellerGuard)
  async updateMyProfile(
    @Req() req,
    @Body() updateSellerDto: UpdateSellerDto,
  ): Promise<Seller> {
    const user = req.user;
    const updatedSeller = await this.sellerService.updateMyProfile(
      user.id,
      updateSellerDto,
    );
    return updatedSeller;
  }

  @Post('products')
  @UseGuards(JwtAuthGuard, SellerGuard)
  async createProduct(@Req() req, @Body() createProductDto): Promise<Product> {
    const user = req.user;
    return this.sellerService.createProduct(user.id, createProductDto);
  }

  @Get('my-products')
  @UseGuards(JwtAuthGuard, SellerGuard)
  async getMyProducts(@Req() req): Promise<Product[]> {
    const user = req.user;
    return this.sellerService.findProductsByUserId(user.id);
  }

  @Get(':id/products')
  async findProductsBySellerId(@Param('id') id: number): Promise<Product[]> {
    return this.sellerService.findProductsBySellerId(id);
  }
}