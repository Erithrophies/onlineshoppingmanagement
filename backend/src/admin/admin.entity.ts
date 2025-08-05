import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  uniqueId: string;

  @Column({name:'JoiningDate', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joiningDate: Date;

  @Column({ type: 'varchar', length: 30, default: 'Unknown' })
  country: string;

  @BeforeInsert()
  generateUUID() {
    this.uniqueId = uuidv4();
  }
}
