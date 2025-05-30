import { Controller,Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';  // ← THIS LINE
import { UserService } from './user.service';
import { User } from '../Entity/user.entity'; // adjust the path to your entity

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
@Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
 
  
}
