import { Injectable } from '@nestjs/common';
import { CreateSellerDto, SellerStatus } from './seller.dto';
import { Seller } from "./seller.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async createSeller(sellerDto: CreateSellerDto): Promise<any> {
  if (!sellerDto.status) {
    sellerDto.status =
      Math.random() > 0.5 ? SellerStatus.ACTIVE : SellerStatus.INACTIVE;
  }

  const seller = this.sellerRepository.create(sellerDto);
  const result = await this.sellerRepository.save(seller);

  return {
    message: 'Seller created successfully!',
    seller: result,
  };
}

  async updateStatus(id: number, status: SellerStatus): Promise<any> {
    const seller = await this.sellerRepository.findOneBy({ id:id  });

    if (!seller) {
      return { message: 'Seller not found' };
    }

    seller.status = status;
    await this.sellerRepository.save(seller);

    return { message: 'Seller status updated to ${status}' };
  }

  async getInactiveSellers(): Promise<Seller[]> {
    return this.sellerRepository.find({ where: { status: SellerStatus.INACTIVE } });
  }

  async getSellersOlderThan(age: number): Promise<Seller[]> {
    return this.sellerRepository
      .createQueryBuilder('seller')
      .where('seller.age > :age', { age })
      .getMany();
  }

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
}
