import { IsString, IsEmail, Matches, IsInt, Min, IsEnum, MaxLength, IsOptional } from 'class-validator';

export enum SellerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateSellerDto {

  @IsString({ message: 'Name must be a string' })
  @MaxLength(100, { message: 'Name must be at most 100 characters long' })
  fullName: string;

  @IsInt({ message: 'Age must be an integer' })
  @Min(0, { message: 'Age must be a non-negative number' })
  age: number;

  @IsOptional()
  @IsEnum(SellerStatus, {
    message: 'Status must be either "active" or "inactive"',
  })
  status?: SellerStatus;

  // @IsString({ message: 'Name must be a string' })
  // @Matches(/^[a-zA-Z]*$/, {
  //   message: 'Name should only contain alphabets and spaces',
  // })
  // name: string;

  // @IsEmail({}, { message: 'Email must be a valid email address' })
  // @Matches(/@.*\.xyz$/, {
  //   message: 'Email must contain "@" and have a ".xyz" domain (e.g., user@example.xyz)',
  // })
  // email: string;

  // @IsString({ message: 'NID number must be a string' })
  // @Matches(/^(?:\d{10}|\d{17})$/, {
  //   message: 'NID number must be a 10, or 17 digit number.',
  // })
  // nidNumber: string;

}
