import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './seller.entity'

@Module({
    imports: [ TypeOrmModule.forFeature([Seller]),],
    controllers: [SellerController],
    providers: [SellerService],
})
export class SellerModule {}