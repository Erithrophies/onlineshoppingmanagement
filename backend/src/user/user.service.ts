import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Like, Repository } from "typeorm";



@Injectable()
export class UserService {
  findAlladmin(): User[] | PromiseLike<User[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  
  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ['admin', 'seller', 'customer'] 
    });
  }
  

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ 
        where: { id },
        relations: ['admin', 'seller', 'customer'] 
    });
  }
}

  //  async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const user = this.userRepository.create(createUserDto);
  //   return this.userRepository.save(user);
  // }

  //    async getUserByFullName(substring: string): Promise<User[]> {
  //    return this.userRepository.find({
  //     where: 
  //     {
  //        fullName: Like(`%${substring}%`) },
  //   });
  // }

  //   async getUserByUsername(username: string):Promise<User> {
  //       const user = await this.userRepository.findOneBy({ username: username });
  //   if (!user) {
  //     throw new  NotFoundException('User ' + username + ' not found.');
  //   }
  //   return user;
  //   }

  //   async removeByUsername(username : string): Promise<{ message: string }> {
  //       const user = await this.userRepository.findOneBy({username:username});
  //       if(!user)
  //       {
  //          throw new NotFoundException('User ' + username+ ' not found.'); 
  //       }

  //       await this.userRepository.delete(user.id);
  //      return { message: 'User ' + username + ' has been deleted.'};
        
  //   }

    // getPhoto(): string {
    //     return 'User Photos';
    // }

    //  getPhotobyid(photoid: number): string {
    //     return 'User photo id is ' + photoid;
    // }

    // getUser():string {
    //     return "All User";
    // }


    // getUserByNameandID(name:string,id:number): object{
    //     return {name:name,id:id}
    // }
