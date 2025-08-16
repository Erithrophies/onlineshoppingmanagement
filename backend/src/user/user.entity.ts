import { Customer } from "src/customer/customer.entity";
import { Seller } from "src/seller/seller.entity";
import { Admin, BeforeInsert, Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
 
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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  // @OneToOne(() => Admin, admin => admin.user, { nullable: true })
  // admin: Admin;

  @OneToOne(() => Seller, seller => seller.user, { nullable: true })
  seller: Seller;

  @OneToOne(() => Customer, customer => customer.user, { nullable: true })
  customer: Customer;
}


