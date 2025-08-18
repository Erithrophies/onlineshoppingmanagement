import { Customer } from "../customer/customer.entity";
import { Seller } from "../seller/seller.entity";

import {Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'; 

@Entity()
export class User {
 

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: ['customer', 'seller', 'admin'], default: 'customer' })
  role: string;



  @OneToOne(() => Seller, seller => seller.user, { nullable: true })
  seller: Seller;

  @OneToOne(() => Customer, customer => customer.user, { nullable: true })
  customer: Customer;
  admin: any;
 
 
  
}

















  // @PrimaryColumn({ type: 'varchar', length: 30 })
  // id: string;

  
  // @Column({ unique: true,  type: 'varchar', length: 100 })
  // username: string;

  
  // @Column({  type: 'varchar', length: 150 })
  // fullName: string;

  
  // @Column({ default: false })
  // isActive: boolean;

  
  // @BeforeInsert()
  // generateId() {
  //   if (!this.id) {
  //      this.id = 'u-'+ Date.now();
      
  //   }
  // }


