import { Injectable } from "@nestjs/common";

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

    createSeller(sellerdata:object):object{
        return sellerdata;
    }
    deleteSeller(id: number): string {
        return 'Seller deleted ';
    }

    getSellerByNameandID(name:string,id:number): object{
        return {name:name,id:id}
    }
}