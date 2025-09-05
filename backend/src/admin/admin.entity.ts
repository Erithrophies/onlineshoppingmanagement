import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
 
@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column( { type: 'varchar', length: 150, unique: true })
  name: string;
 
  @Column()
  email: string;
 
   @OneToOne(() => User, user => user.admin)
  @JoinColumn()
  user: User;
}
 



























// import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';

// @Entity()
// export class Admin {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({type: 'varchar', length: 150, unique: true })
//   uniqueId: string;

//   @Column({name:'JoiningDate', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   joiningDate: Date;

//   @Column({ type: 'varchar', length: 30, default: 'Unknown' })
//   country: string;

//   @BeforeInsert()
//   generateUUID() {
//     this.uniqueId = uuidv4();
//   }
// }
