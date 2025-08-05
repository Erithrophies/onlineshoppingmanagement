import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";
import { get } from "http";
import { User } from "./user.entity";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('createUser')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userdata: CreateUserDto):Promise<User>{
            return this.userService.createUser(userdata);
    }

    @Get('getUser')
    getUserByFullName(@Query('name') name:string): Promise<User[]> {
         return this.userService.getUserByFullName(name);
    }
    
    @Get(':username')
    getUserByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.getUserByUsername(username);
    }

    @Delete('deleteUser/:username')
    removeByUsername(@Param('username') username: string): Promise<{ message: string }> {
    return this.userService.removeByUsername(username);
  }
    

    // @Get()
    // getUserInfo(): string {
    //     return this.userService.getUserInfo();
    // }

    // @Get('Photo')
    // getPhoto(): string {
    //     return this.userService.getPhoto();
    // }

    // @Get('Photo/:id')
    // getPhotobyid(@Param('id') photoid: number): string {
    //     return this.userService.getPhotobyid(photoid);
    // } 

    // @Get('all')
    // getUser(){
    //     return this.userService.getUser();
    // }

    // // @Post('createUser')
    // // @UsePipes(new ValidationPipe())
    // // createUser(@Body() userdata: CreateUserDto)  : object {
    // //     console.log(userdata);
    // //     return this.userService.createUser(userdata);
    // // }
    
    // @Delete('deleteUser/:id') 
    // deleteUser(@Param('id') id: number): string { 
    //     return this.userService.deleteUser(id); 
    // }

    // @Get('getUser')
    // getUserbyNameandID(@Query('name') name:string ,@Query('id') id:number): object {
    // return this.userService.getUserByNameandID(name,id);
    // }
}