// admin.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { User } from '../user/user.entity';
import { Seller } from '../seller/seller.entity';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';
import { Payment } from '../payment/payment.entity';
import { AuthModule } from '../auth/auth.module'; 
import { AdminRoleGuard } from './admin.roleguard';
import { MailModule } from './mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      User,
      Seller,
      Product,
      Order,
      Payment
    ]),
<<<<<<< HEAD
    AuthModule,MailModule
=======
    AuthModule
>>>>>>> e3c4b1c805b5aaf48025f92640fee85fa84ea8d4
  ],
  controllers: [AdminController,],
  providers: [AdminService,AdminRoleGuard],
})
export class AdminModule {}
















































// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Admin } from './admin.entity';
// import { AdminService } from './admin.service';
// import { AdminController } from './admin.controller';
// import { User } from '../user/user.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([Admin, User])],
//   providers: [AdminService],
//   controllers: [AdminController],
// })
// export class AdminModule {}


















// import { Module } from "@nestjs/common";
// import { AdminController } from './admin.controller';
// import { AdminService } from './admin.service';
// import { Type } from "class-transformer";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { Admin } from './admin.entity';
// @Module({
//   imports: [TypeOrmModule.forFeature([Admin])],
//   controllers: [AdminController],
//   providers: [AdminService],
// })
// export class AdminModule {}