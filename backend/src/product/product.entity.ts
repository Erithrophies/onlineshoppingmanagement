import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Seller } from '../seller/seller.entity';
import { OrderDetails } from '../order/order-details.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Seller, seller => seller.products)
  seller: Seller;

  @OneToMany(() => OrderDetails, orderDetails => orderDetails.product)
  orderDetails: OrderDetails[];
}