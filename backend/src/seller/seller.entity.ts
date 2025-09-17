import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';



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

   @Column({ type: 'varchar', default: 'pending' })
  status: string;
  

}
