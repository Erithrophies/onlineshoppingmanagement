import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { SellerModule } from './seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [AdminModule, UserModule, SellerModule, CustomerModule, ProductModule, PaymentModule, OrderModule, TypeOrmModule.forRoot(
{ type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: '1234',
database: 'ecommerce',
autoLoadEntities: true,
synchronize: true,
} ),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
