import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
@Entity("admin")
export class UserEntity{
@PrimaryGeneratedColumn()
id: number;
@Column()
name: string;
@Column()
email: string;
@Column()
password: string;
}
