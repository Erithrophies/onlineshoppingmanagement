import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, Between } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepo: Repository<Admin>) {}

  async createAdmin(dto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepo.create(dto);
    return this.adminRepo.save(admin);
  }

  async updateCountry(id: number, country: string): Promise<Admin> {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) throw new NotFoundException('Admin with id ${id} not found');
    admin.country = country;
    return this.adminRepo.save(admin);
  }


 async getByJoiningDate(dateStr: string): Promise<Admin[]> {
    const startDate = new Date(dateStr);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(dateStr);
    endDate.setHours(23, 59, 59, 999);

    return this.adminRepo.find({
      where: {
        joiningDate: Between(startDate, endDate),
      },
    });
  }


  // async getByJoiningDate(Date:Date): Promise<Admin[]> {
  //   return this.adminRepo.find({
  //   where: {
  //     date: Date,
  //   },
  //   });
  // }

  async getByUnknownCountry(): Promise<Admin[]> {
    return this.adminRepo.find({ where: { country: 'Unknown' }});
  }
}






















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