import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateCustomerPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Old password must be at least 6 characters long' })
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;
}