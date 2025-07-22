import { Injectable } from "@nestjs/common";
@Injectable()
export class AdminService {
  getAdminInfo(): string {
    return 'Admin Information';
  }

    getPhoto(): string {
        return 'Admin Photos';
    }

    getAdmin():string {
        return "All Admin";
    }
    getPhotobyid(photoid: number): string {
        return 'Admin photo id is ' + photoid;
    }

      getAdminByNameandID(name:string,id:number): object{
        return {name:name,id:id}
    }
    addAdmin(admin:object):object{
        return admin;
    }
}