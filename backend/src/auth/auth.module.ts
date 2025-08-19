// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; // Keep this
import { JwtStrategy } from './jwt.strategy';
import{ JwtAuthGuard } from './jwt.auth.guard';
import { CustomerGuard } from 'src/customer/customer.guard';
import { AdminRoleGuard } from 'src/admin/admin.roleguard';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '60m' },
    }),UserModule,
  ],
  providers: [ AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService,JwtAuthGuard], // Export JwtAuthGuard if you want to use it in other modules
})
export class AuthModule {}

















// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { UserModule } from '../user/user.module';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [
//     UserModule,
//     PassportModule,
//     JwtModule.register({
//       secret: 'your_secret_key',
//       signOptions: { expiresIn: '60m' },
//     }),
//   ],
//   providers: [AuthService, JwtStrategy],
//   controllers: [AuthController],
// })
// export class AuthModule {}