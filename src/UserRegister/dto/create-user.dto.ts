import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Please fill the name field' })
  @IsString({ message: 'Name must be a string' })
  name!: string;

  @IsNotEmpty({ message: 'Please fill the email field' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email!: string;

  @IsNotEmpty({ message: 'Please fill the password field' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @IsNotEmpty({ message: 'Please select a role' })
  @IsString({ message: 'Role must be a string' })
  roleName!: string;
}
