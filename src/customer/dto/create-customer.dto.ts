import { IsNotEmpty, MinLength } from 'class-validator';
export class CreateCustomerDto {

  @IsNotEmpty({ message: 'Please fill the name field' })
  name!: string;
    @IsNotEmpty({ message: 'Please fill the email field' })
  email!: string;
    @IsNotEmpty({ message: 'Please fill the password field' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;
}
