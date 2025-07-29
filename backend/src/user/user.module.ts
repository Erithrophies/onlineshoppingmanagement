import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
//import { UserEntity } from "./user.entity";



@Module({
    imports: [UserModule,],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}