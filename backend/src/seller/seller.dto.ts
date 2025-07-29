import { IsString, IsEmail, Matches } from 'class-validator';

export class CreateSellerDto {
  @IsString({ message: 'Name must be a string' })
  @Matches(/^[a-zA-Z]*$/, {
    message: 'Name should only contain alphabets and spaces',
  })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Matches(/@.*\.xyz$/, {
    message: 'Email must contain "@" and have a ".xyz" domain (e.g., user@example.xyz)',
  })
  email: string;

  @IsString({ message: 'NID number must be a string' })
  @Matches(/^(?:\d{10}|\d{17})$/, {
    message: 'NID number must be a 10, or 17 digit number.',
  })
  nidNumber: string;
}