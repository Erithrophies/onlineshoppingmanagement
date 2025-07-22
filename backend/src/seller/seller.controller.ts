import { Controller,Get,Param,Body,Post,Query, Delete } from "@nestjs/common";    
import { SellerService } from './seller.service';
import { get } from "http";

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get()
    getSellerInfo(): string {
        return this.sellerService.getSellerInfo();
    }

    @Get('all')
    getSeller(){
        return this.sellerService.getSeller();
    }

    @Get('Photo/:id')
    getPhotobyid(@Param('id') photoid: number): string {
        return this.sellerService.getPhotobyid(photoid);
    } 
    
    getSellerbyNameandID(@Query('name') name:string ,@Query('id') id:number): object {
return this.sellerService.getSellerByNameandID(name,id);
    }

    @Post("createSeller")
   createSeller(@Body() sellerdata: object)  : object{
    return this.sellerService.createSeller(sellerdata);
   }

    @Delete('deleteSeller/:id') 
       deleteSeller(@Param('id') id: number): string { 
           return this.sellerService.deleteSeller(id); 
       }
   
}