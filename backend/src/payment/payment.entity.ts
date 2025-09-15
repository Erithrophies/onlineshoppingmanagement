import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';
import { Customer } from 'src/customer/customer.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  paymentMethod: string;

  @Column({ default: 'pending' })
  status: string;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Customer, customer => customer.payments) // <-- Add this relationship
  @JoinColumn() // <-- Add this to define the foreign key column
  customer: Customer;
}