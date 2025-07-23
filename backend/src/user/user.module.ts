import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [UserModule, TypeOrmModule.forFeature([UserEntity]),],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}