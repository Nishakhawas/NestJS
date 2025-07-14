import { Controller,Get, Post, Body, Delete, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';  // ← THIS LINE
import { UserService } from './user.service';
import { User } from '../Entity/user.entity'; // adjust the path to your entity

@Controller('register')
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

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{message:string}> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with  ID ${id} not found`);
    }
    await this.userService.delete(id);
    return {message:"Deleted successfully"}
  }

 
  //  @UseGuards( JwtAuthGuard,PermissionGuard) 
  // @CheckPermission('manage_users') // 👈 permission required
  // @Post('admin/create')
  // createUser(@Body() dto: CreateUserDto) {
  //   return this.userService.create(dto);
  // }
  
}
