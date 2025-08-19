import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { User } from '../user/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from 'src/order/order.entity';
import { CustomerGuard } from './customer.guard';
import { Product } from 'src/product/product.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User,Order,Product]),AuthModule,ProductModule],
  providers: [CustomerService,CustomerGuard],
  controllers: [CustomerController],
})
export class CustomerModule {}