import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";
import { get } from "http";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Get()
    getUserInfo(): string {
        return this.userService.getUserInfo();
    }

    @Get('Photo')
    getPhoto(): string {
        return this.userService.getPhoto();
    }

    @Get('Photo/:id')
    getPhotobyid(@Param('id') photoid: number): string {
        return this.userService.getPhotobyid(photoid);
    } 

    @Get('all')
    getUser(){
        return this.userService.getUser();
    }

    @Post('createUser')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userdata: CreateUserDto)  : object {
        console.log(userdata);
        return this.userService.createUser(userdata);
    }
    @Delete('deleteUser/:id') 
    deleteUser(@Param('id') id: number): string { 
        return this.userService.deleteUser(id); 
    }

    @Get('getUser')
    getUserbyNameandID(@Query('name') name:string ,@Query('id') id:number): object {
    return this.userService.getUserByNameandID(name,id);
    }
}