import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './seller.entity';
import { CreateSellerDto } from './seller.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createSellerDto.password, salt);
    
    const user = this.usersRepository.create({ 
      username: createSellerDto.username,
      passwordHash: passwordHash 
    });
    
    await this.usersRepository.save(user);

    const seller = this.sellersRepository.create({
      shopName: createSellerDto.shopName,
      email: createSellerDto.email,
      user: user,
    });

    return this.sellersRepository.save(seller);
  }
}

//   async createSeller(sellerDto: CreateSellerDto): Promise<any> {
//   if (!sellerDto.status) {
//     sellerDto.status =
//       Math.random() > 0.5 ? SellerStatus.ACTIVE : SellerStatus.INACTIVE;
//   }

//   const seller = this.sellerRepository.create(sellerDto);
//   const result = await this.sellerRepository.save(seller);

//   return {
//     message: 'Seller created successfully!',
//     seller: result,
//   };
// }

//   async updateStatus(id: number, status: SellerStatus): Promise<any> {
//     const seller = await this.sellerRepository.findOneBy({ id:id  });

//     if (!seller) {
//       return { message: 'Seller not found' };
//     }

//     seller.status = status;
//     await this.sellerRepository.save(seller);

//     return { message: `Seller status updated to ${status}` };
//   }

//   async getInactiveSellers(): Promise<Seller[]> {
//     return this.sellerRepository.find({ where: { status: SellerStatus.INACTIVE } });
//   }

//   async findByStatus(status: SellerStatus) {
//   return this.sellerRepository.find({ where: { status } });
// }

//   async getSellersOlderThan(age: number): Promise<Seller[]> {
//     return this.sellerRepository
//       .createQueryBuilder('seller')
//       .where('seller.age > :age', { age })
//       .getMany();
//   }

  // getSellerInfo(): string {
  //   return 'Seller information';
  // }

  // getPhotobyid(photoid: number): string {
  //   return 'Seller photo id is ' + photoid;
  // }

  // getSeller(): string {
  //   return 'All Seller';
  // }

  // getSellerByNameandID(name: string, id: number): object {
  //   return { name: name, id: id };
  // }

  // deleteSeller(id: number): string {
  //   return 'Seller deleted ';
  // }

