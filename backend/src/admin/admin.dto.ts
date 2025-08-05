import { IsNotEmpty, IsString, IsEmail, Matches, MinLength, IsIn, IsNumberString, IsDateString, IsOptional, MaxLength } from 'class-validator';    

export class CreateAdminDto {
 


 @IsOptional()
  @IsString()
  @MaxLength(30)
  country?: string;






























  // @IsNotEmpty()
  // @IsString()
  // name: string;

  // @IsEmail({}, { message: 'Invalid email format' })
  // @Matches(/@aiub\.edu$/, {
  //   message: 'Email must be from aiub.edu domain'
  // })
  // email: string;

  // @IsNotEmpty()
  // @MinLength(6, { message: 'Password must be at least 6 characters long' })
  // @Matches(/[A-Z]/, {
  //   message: 'invalid password',
  // })
  // password: string;

  // @IsIn(['male', 'female'], {
  //   message: 'Gender must be either male or female',
  // })
  // gender: string;

  // @IsNumberString({},{ message: 'Phone number must contain only numbers' })
  // phone: string;
}
