import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '../user/user.dto';

export class CreateCustomerDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
}