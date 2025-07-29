import { Controller,Get,Param,Body,Post,Query, Delete, UsePipes, ValidationPipe, ParseIntPipe } from "@nestjs/common";    
import { AdminService } from './admin.service';
import { CreateAdminDto } from "./admin.dto";

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
    getAdminInfo(): string {
        return this.adminService.getAdminInfo();
    }


    @Get('all')
    getAdmin(){
        return this.adminService.getAdmin();
    }

    @Get('Photo/:id')
    getPhotobyid(@Param('id',ParseIntPipe) photoid: number) {    
        return this.adminService.getPhotobyid(photoid);
    } 
    
    @Get('getadmin')
    getAdminbyNameandID(@Query('name') name:string ,@Query('id') id:number): object {

return this.adminService.getAdminByNameandID(name,id);
    }

    @Post("addadmin")
    @UsePipes(new ValidationPipe())
   addAdmin(@Body() admindata: CreateAdminDto): object {
    return this.adminService.addAdmin(admindata);
   }

    @Delete('deleteAdmin/:id') 
       deleteAdmin(@Param('id') id: number): string { 
           return this.adminService.deleteAdmin(id); 
       }
   
}