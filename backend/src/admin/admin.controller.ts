import { Controller,Get,Param,Body,Post,Query, Delete } from "@nestjs/common";    
import { AdminService } from './admin.service';
import { get } from "http";

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
    getAdminInfo(): string {
        return this.adminService.getAdminInfo();
    }

    @Get('Photo')
    getPhoto(): string {
        return this.adminService.getPhoto();
    }

    @Get('all')
    getAdmin(){
        return this.adminService.getAdmin();
    }

    @Get('Photo/:id')
    getPhotobyid(@Param('id') photoid: number): string {
        return this.adminService.getPhotobyid(photoid);
    } 
    
    getAdminbyNameandID(@Query('name') name:string ,@Query('id') id:number): object {
return this.adminService.getAdminByNameandID(name,id);
    }

    @Post("addadmin")
   addAdmin(@Body() admindata: object)  : object{
    return this.adminService.addAdmin(admindata);
   }

    @Delete('deleteUser/:id') 
       deleteAdmin(@Param('id') id: number): string { 
           return this.adminService.deleteAdmin(id); 
       }
   
}