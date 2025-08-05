import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
 
  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  
  @Column({ unique: true,  type: 'varchar', length: 100 })
  username: string;

  
  @Column({  type: 'varchar', length: 150 })
  fullName: string;

  
  @Column({ default: false })
  isActive: boolean;

  
  @BeforeInsert()
  generateId() {
    if (!this.id) {
       this.id = 'u-'+ Date.now();
      
    }
  }
}


