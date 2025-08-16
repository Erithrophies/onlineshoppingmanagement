import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetails } from './order-details.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails, Customer, Product])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}