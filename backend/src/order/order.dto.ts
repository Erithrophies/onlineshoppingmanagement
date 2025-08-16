import { IsNotEmpty, IsNumber, IsArray, ArrayMinSize, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailsDto)
  items: CreateOrderDetailsDto[];
}