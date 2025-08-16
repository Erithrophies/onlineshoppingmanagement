import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { OrderDetails } from './order-details.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderDetails, orderDetails => orderDetails.order)
  items: OrderDetails[];
}