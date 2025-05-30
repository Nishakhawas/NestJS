import { IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
    
 @IsNotEmpty({ message: 'Please fill the email field' })
  email!: string;
  @IsNotEmpty({ message: 'Please fill the password field' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;
}
