import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [ AdminModule, UserModule, SellerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
