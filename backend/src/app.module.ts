import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { SellerModule } from './seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ AdminModule, UserModule, SellerModule, TypeOrmModule.forRoot(
{ type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: '1234',
database: 'osm',//Change to your database name
autoLoadEntities: true,
synchronize: true,
} )],
  controllers: [],
  providers: [],
})
export class AppModule {}
