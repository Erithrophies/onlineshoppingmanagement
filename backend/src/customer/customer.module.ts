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
import { OrderModule } from 'src/order/order.module';
import { PaymentModule } from 'src/payment/payment.module';
import { Payment } from 'src/payment/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User,Order,Product,Payment,Customer]),AuthModule,OrderModule,PaymentModule,ProductModule],
  providers: [CustomerService,CustomerGuard],
  controllers: [CustomerController],
  exports:[TypeOrmModule.forFeature([Customer, User,Order,Product,Payment,Customer]),AuthModule,OrderModule,PaymentModule,ProductModule],
})
export class CustomerModule {}