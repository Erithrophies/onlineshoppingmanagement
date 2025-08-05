import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './admin.dto';
import { Admin } from './admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  createAdmin(@Body() dto: CreateAdminDto): Promise<Admin> {
    return this.adminService.createAdmin(dto);
  }

  @Patch('updateCountry/:id')
  updateCountry(@Param('id') id: number,@Body('country') country: string): Promise<Admin> {
    return this.adminService.updateCountry(id, country);
  }

  @Get('byDate')
  getByJoiningDate(@Query('date') date: string): Promise<Admin[]> {
    return this.adminService.getByJoiningDate(date);
  }

  @Get('unknownCountry')
  getByUnknownCountry(): Promise<Admin[]> {
    return this.adminService.getByUnknownCountry();
  }
}


































// import { Controller,Get,Param,Body,Post,Query, Delete, UsePipes, ValidationPipe, ParseIntPipe } from "@nestjs/common";    
// import { AdminService } from './admin.service';
// import { CreateAdminDto } from "./admin.dto";

// @Controller('admin')
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}

//   @Get()
//     getAdminInfo(): string {
//         return this.adminService.getAdminInfo();
//     }


//     @Get('all')
//     getAdmin(){
//         return this.adminService.getAdmin();
//     }

//     @Get('Photo/:id')
//     getPhotobyid(@Param('id',ParseIntPipe) photoid: number) {    
//         return this.adminService.getPhotobyid(photoid);
//     } 
    
//     @Get('getadmin')
//     getAdminbyNameandID(@Query('name') name:string ,@Query('id') id:number): object {

//         return this.adminService.getAdminByNameandID(name,id);
//     }

//     @Post("addadmin")
//     @UsePipes(new ValidationPipe())
//        addAdmin(@Body() admindata: CreateAdminDto): object {
//        return this.adminService.addAdmin(admindata);
//    }

//     @Delete('deleteAdmin/:id') 
//        deleteAdmin(@Param('id') id: number): string { 
//            return this.adminService.deleteAdmin(id); 
//        }
   
// }