import { Controller,Get,Param,Body,Post,Query, Delete, UploadedFile, UsePipes, ValidationPipe, UseInterceptors } from "@nestjs/common";    
import { SellerService } from './seller.service';
import { get } from "http";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateSellerDto } from "./seller.dto";
import { diskStorage, MulterError } from "multer";

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

    @Post('create')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('nidImage', { 
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {

          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 }, 
      storage: diskStorage({
        destination: './uploads', 
        filename: function (req, file, cb) {

          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  async createSeller(
    @Body() createSellerDto: CreateSellerDto,
    @UploadedFile() nidImage: Express.Multer.File)
   {
        console.log('Received Seller DTO:', createSellerDto);
        console.log('Received NID Image:', nidImage);

        return this.sellerService.createSeller(createSellerDto, nidImage);
   }

    @Delete('deleteSeller/:id') 
       deleteSeller(@Param('id') id: number): string { 
           return this.sellerService.deleteSeller(id); 
       }
   
}