// src/seller/updateSeller.dto.ts

import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateSellerDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  shopName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;
}