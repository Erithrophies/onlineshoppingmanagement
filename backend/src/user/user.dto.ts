import {IsString, IsEmail,MinLength,Matches,IsOptional,IsUrl,IsDateString, IsDate, } from 'class-validator';
import { Type } from 'class-transformer'; 

export class CreateUserDto {
  @IsString()
  @Matches(/^[^0-9]*$/, {
    message: 'Name should not contain any numbers',
  })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' }) 
  @Matches(/.*[@#$&].*/, {
    message: 'Password must contain one of the special characters (@, #, $, or &)',
  })
  password: string;

  
  @IsDateString({}, { message: 'Date of birth must be a valid date string (e.g., YYYY-MM-DD)' })
  dateOfBirth: string; 

  
  @IsUrl({}, { message: 'Facebook link must be a valid URL' })
  facebookLink?: string;

}