import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { IsEnum, IsInt, MaxLength, Min } from 'class-validator';

export enum SellerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class Seller {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  @Column({ type: 'varchar', length: 100 })
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

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = 's-' + Date.now();
    }
  }
}
