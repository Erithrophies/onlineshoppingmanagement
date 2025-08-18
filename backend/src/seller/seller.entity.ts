import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

// export enum SellerStatus {
//   ACTIVE = 'active',
//   INACTIVE = 'inactive',
// }

@Entity('seller')
export class Seller {

   @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shopName: string;

  @Column()
  email: string;

  @OneToOne(() => User, user => user.seller)
  @JoinColumn()
  user: User;

  @OneToMany(() => Product, product => product.seller)
  products: Product[];
  status: string;
  // @PrimaryGeneratedColumn({ unsigned: true })
  // id: number;

  // @Column({ type: 'varchar', length: 100 })
  // fullName: string;

  // @Column({ type: 'int', unsigned: true })
  // age: number;

  // @Column({
  //   type: 'enum',
  //   enum: SellerStatus,
  //   default: SellerStatus.ACTIVE,
  // })
  // @IsEnum(SellerStatus)
  // status: SellerStatus;
}
