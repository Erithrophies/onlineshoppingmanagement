import { Controller, Get, Param, Body, Post, Patch, Query, Delete, UploadedFile, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { SellerService } from './seller.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSellerDto, SellerStatus } from './seller.dto';
import { diskStorage, MulterError } from 'multer';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async createSeller(@Body() createSellerDto: CreateSellerDto) {
    console.log('Received Seller DTO:', createSellerDto);
    return this.sellerService.createSeller(createSellerDto);
  }

  @Patch('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: SellerStatus,
  ) {
    return this.sellerService.updateStatus(id, status);
  }

  @Get('inactive')
  getInactiveSellers() {
    return this.sellerService.getInactiveSellers();
  }

  @Get('older-than-40')
  getSellersOlderThan40() {
    return this.sellerService.getSellersOlderThan(40);
  }
  
  // @Get()
  // getSellerInfo(): string {
  //   return this.sellerService.getSellerInfo();
  // }

  // @Get('all')
  // getSeller() {
  //   return this.sellerService.getSeller();
  // }

  // @Get('Photo/:id')
  // getPhotobyid(@Param('id') photoid: number): string {
  //   return this.sellerService.getPhotobyid(photoid);
  // }

  // @Get('search')
  // getSellerbyNameandID(@Query('name') name: string, @Query('id') id: number): object {
  //   return this.sellerService.getSellerByNameandID(name, id);
  // }

  // @Delete('deleteSeller/:id')
  // deleteSeller(@Param('id') id: number): string {
  //   return this.sellerService.deleteSeller(id);
  // }
}
