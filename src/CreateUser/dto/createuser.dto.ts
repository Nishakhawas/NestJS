import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserdto {
  @IsNotEmpty({ message: 'Please fill the name field' })
  @IsString({ message: 'Name must be a string' })
  userName!: string;

  @IsNotEmpty({ message: 'Please fill the email field' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  userEmail!: string;

  @IsNotEmpty({ message: 'Please fill the password field' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @IsNotEmpty({ message: 'Please fill the name field' })
  @IsString({ message: 'Name must be a string' })
  confirmPassword!: string;

  @IsNotEmpty({ message: 'Please fill the name field' })
  @IsString({ message: 'Name must be a string' })
  fullName!: string;

  @IsNotEmpty({ message: 'Please fill the name field' })
  @IsNumber()
  contact!: number;

  @IsNotEmpty({ message: 'Please fill the name field' })
  @IsString({ message: 'Name must be a string' })
  location!: string;
  
  @IsNotEmpty({ message: 'Please fill the name field' })
  @IsString({ message: 'Name must be a string' })
  employee!: string;

  @IsNotEmpty({ message: 'Please fill the name field' })
  @IsString({ message: 'Name must be a string' })
  department!: string;

  @IsOptional()
  @IsBoolean()
  isActive!: boolean;

  @IsNotEmpty()
  groupId!: number;

  
}


 // @IsNotEmpty({ message: 'Please fill the name field' })
  // @IsString({ message: 'Name must be a string' })
  // userGroup!: string;