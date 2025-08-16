import {IsString, IsEmail,MinLength,Matches,IsOptional,IsUrl,IsDateString, IsDate, IsNotEmpty, } from 'class-validator';


export class CreateUserDto {
  // @IsString()
  // @IsNotEmpty({ message: 'Username is required' })
  // @MinLength(3, { message: 'Username must be at least 3 characters long' })
  // @Matches(/^[^0-9]*$/, {
  //   message: 'Username should not contain any numbers',
  // })
  // username: string;

  // @IsString()
  // @IsNotEmpty({ message: 'Full name is required' })
  // @Matches(/^[^0-9]*$/, {
  //   message: 'Full name should not contain any numbers',
  // })
  // fullName: string;

   @IsNotEmpty()
  @IsString()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  

  // @IsString()
  // @MinLength(8, { message: 'Password must be at least 8 characters long' }) 
  // @Matches(/.*[@#$&].*/, {
  //   message: 'Password must contain one of the special characters (@, #, $, or &)',
  // })
  // password: string;

  
  // @IsDateString({},{ message: 'Date of birth must be a valid date string (e.g., YYYY-MM-DD)' })
  // @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date of birth must be in YYYY-MM-DD format' })
  // dateOfBirth: string; 

  
  // @IsUrl({}, { message: 'Facebook link must be a valid URL' })
  // facebookLink: string;

}