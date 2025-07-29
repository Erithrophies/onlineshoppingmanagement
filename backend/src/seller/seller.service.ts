import { Injectable } from "@nestjs/common";
import { CreateSellerDto } from "./seller.dto";

@Injectable()
export class SellerService {
    getSellerInfo():string {
        return  "Seller information";
    }

     getPhotobyid(photoid: number): string {
        return 'Seller photo id is ' + photoid;
    }

    getSeller():string {
        return "All Seller";
    }

    async createSeller( 
    sellerDto: CreateSellerDto, 
    nidImage: Express.Multer.File, 
  ): Promise<any> { 
    console.log('Service received DTO:', sellerDto);
    console.log('Service received NID Image:', nidImage);


    return {
      message: 'Seller created successfully with NID image!',
      sellerData: sellerDto,
      imageInfo: {
        filename: nidImage.filename,
        path: nidImage.path,
        size: nidImage.size,
        mimetype: nidImage.mimetype,
      },
    };
  }
    deleteSeller(id: number): string {
        return 'Seller deleted ';
    }

    getSellerByNameandID(name:string,id:number): object{
        return {name:name,id:id}
    }
}