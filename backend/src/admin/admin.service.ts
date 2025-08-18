import { Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Seller } from '../seller/seller.entity';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';
import { Payment } from '../payment/payment.entity';
import { CreateAdminDto } from './admin.dto';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Seller) private sellerRepo: Repository<Seller>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
  ) {}


  // In admin.service.ts
async countAdmins(): Promise<number> {
  return this.adminRepo.count();
}

// admin.service.ts
async create(createAdminDto: CreateAdminDto): Promise<Admin> {
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(createAdminDto.password, salt);
  
  // Create user with ADMIN role
  const user = this.userRepo.create({
    username: createAdminDto.username,
    passwordHash,
    role: 'admin' // Must be set to 'admin'
  });
  
  await this.userRepo.save(user);

  const admin = this.adminRepo.create({
    name: createAdminDto.name,
    email: createAdminDto.email,
    user
  });

  return this.adminRepo.save(admin);
}

  // 1. Get all users
  async findAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  // 2. Get all sellers
  async findAllSellers(): Promise<Seller[]> {
    // console.log('all sellers show');
    return this.sellerRepo.find();
  }

  // 3. Update seller status
  async updateSellerStatus(id: number, status: string): Promise<Seller> {
    const seller = await this.sellerRepo.findOne({ where: { id } });
    if (!seller) {
      throw new NotFoundException('Seller with ID not found');
    }
    seller.status = status;
    return this.sellerRepo.save(seller);
  }

  // 4. Get all products
  async findAllProducts(): Promise<Product[]> {
    return this.productRepo.find();
  }

  // 5. Delete a product
  async deleteProduct(id: string): Promise<boolean> {
    const result = await this.productRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  // 6. Get all orders
  async findAllOrders(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  // 7. Get all payments
  async findAllPayments(): Promise<Payment[]> {
    return this.paymentRepo.find();
  }

  // 8. Delete a user
  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}




































// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Admin } from './admin.entity';
// import { CreateAdminDto } from './admin.dto';
// import { User } from '../user/user.entity';
// import * as bcrypt from 'bcrypt';
 
// @Injectable()
// export class AdminService {
//   constructor(
//     @InjectRepository(Admin)
//     private adminsRepository: Repository<Admin>,
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}
 
//   async create(createAdminDto: CreateAdminDto): Promise<Admin> {
//     const salt = await bcrypt.genSalt();
//     const passwordHash = await bcrypt.hash(createAdminDto.password, salt);
    
//     const user = this.usersRepository.create({
//       username: createAdminDto.username,
//       passwordHash: passwordHash
//     });
    
//     await this.usersRepository.save(user);
 
//     const admin = this.adminsRepository.create({
// name: createAdminDto.name,
// email: createAdminDto.email,
//       user: user,
//     });
 
//     return this.adminsRepository.save(admin);
//   }
 
//   async findOne(id: number): Promise<Admin> {
//     const admin = await this.adminsRepository.findOne({
//       where: { id },
//       relations: ['user']
//     });
//     if (!admin) {
//       throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
//     }
//     return admin;
//   }
// }























// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, Between } from 'typeorm';
// import { Admin } from './admin.entity';
// import { CreateAdminDto } from './admin.dto';

// @Injectable()
// export class AdminService {
//   constructor(@InjectRepository(Admin) private adminRepo: Repository<Admin>) {}

//   async createAdmin(dto: CreateAdminDto): Promise<Admin> {
//     const admin = this.adminRepo.create(dto);
//     return this.adminRepo.save(admin);
//   }

//   async updateCountry(id: number, country: string): Promise<Admin> {
//     const admin = await this.adminRepo.findOneBy({ id });
//     if (!admin) throw new NotFoundException('Admin with id ${id} not found');
//     admin.country = country;
//     return this.adminRepo.save(admin);
//   }


//  async getByJoiningDate(dateStr: string): Promise<Admin[]> {
//     const startDate = new Date(dateStr);
//     startDate.setHours(0, 0, 0, 0);

//     const endDate = new Date(dateStr);
//     endDate.setHours(23, 59, 59, 999);

//     return this.adminRepo.find({where: { joiningDate: Between(startDate, endDate),},});
//   }

  


//   async getByJoiningDateExact(date: Date): Promise<Admin[]> {
//     return this.adminRepo.find({
//       where: { joiningDate: date },
//     });
//   }

//   async getByUnknownCountry(): Promise<Admin[]> {
//     return this.adminRepo.find({ where: { country: 'Unknown' }});
//   }
// }






















// import { Injectable } from "@nestjs/common";
// import { CreateAdminDto } from "./admin.dto";
// @Injectable()
// export class AdminService {
  
//   getAdminInfo(): string {
//     return 'Admin Information Show';
//   }

//     getAdmin():string {
//         return "All Admin Show";
//     }

//     getPhotobyid(photoid: number) {
//         return 'Admin photo id is ' + photoid;
//     }

//       getAdminByNameandID(name:string,id:number): object{
//         return {name:name,id:id}
//     }
//     addAdmin(admin:CreateAdminDto):object{
//         return admin;
//     }

//     deleteAdmin(id: number): string {
//         return 'Admin  deleted ';
//     }
// }