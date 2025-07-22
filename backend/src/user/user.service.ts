import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    getUserInfo():string {
        return  "User information";
    }

    getPhoto(): string {
        return 'User Photos';
    }

     getPhotobyid(photoid: number): string {
        return 'User photo id is ' + photoid;
    }

    getUser():string {
        return "All User";
    }

    createUser(userdata:object):object{
        return userdata;
    }
    deleteUser(id: number): string {
        return 'User deleted ';
    }

    getUserByNameandID(name:string,id:number): object{
        return {name:name,id:id}
    }
}