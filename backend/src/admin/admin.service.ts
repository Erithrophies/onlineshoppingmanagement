import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./admin.dto";
@Injectable()
export class AdminService {
  getAdminInfo(): string {
    return 'Admin Information Show';
  }

    getAdmin():string {
        return "All Admin Show";
    }

    getPhotobyid(photoid: number) {
        return 'Admin photo id is ' + photoid;
    }

      getAdminByNameandID(name:string,id:number): object{
        return {name:name,id:id}
    }
    addAdmin(admin:CreateAdminDto):object{
        return admin;
    }

    deleteAdmin(id: number): string {
        return 'Admin  deleted ';
    }
}