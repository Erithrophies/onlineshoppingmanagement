import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => User, user => user.customer)
  @JoinColumn()
  user: User;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];
}