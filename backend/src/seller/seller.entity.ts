import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEnum, IsInt, IsString, MaxLength, Min } from 'class-validator';

export enum SellerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('sellers')
export class Seller {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @MaxLength(100)
  fullName: string;

  @Column({ type: 'int', unsigned: true })
  @IsInt()
  @Min(0)
  age: number;

  @Column({
    type: 'enum',
    enum: SellerStatus,
    default: SellerStatus.ACTIVE,
  })
  @IsEnum(SellerStatus)
  status: SellerStatus;
}
