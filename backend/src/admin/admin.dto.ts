import { IsNotEmpty, IsString, IsEmail, Matches, MinLength, IsIn, IsNumberString, IsDateString } from 'class-validator';    

export class CreateAdminDto {
 
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/@aiub\.edu$/, {
    message: 'Email must be from aiub.edu domain',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  password: string;

  @IsIn(['male', 'female'], {
    message: 'Gender must be either male or female',
  })
  gender: string;

  @IsNumberString({}, { message: 'Phone number must contain only numbers' })
  phone: string;
}
