import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { createUserService } from './createuser.service';
import { CreateUserdto } from './dto/createuser.dto';

@Controller('user')
export class createUserController {
  constructor(private readonly createuserservice: createUserService) {}

@Post()
async create(@Body() createuserdto: CreateUserdto) {
  const user  = await this.createuserservice.create(createuserdto);
  return {
    message: 'User successfully created',
    data: {
      ...user,
      password: undefined,
      confirmPassword: undefined,
      group: user?.group,
       permissions: user?.group?.permissions || [],
    },
  };
}

  // @Get()
  // findAll() {
  //   return this.createuserservice.findAll();
  // }

  @Get()
async findAll() {
  const users = await this.createuserservice.findAll();

  return users.map((user) => ({
    ...user,
    password: undefined,
    confirmPassword: undefined,
    permissions: user.group?.permissions || [],
  }));
}

  
@Get('search')
async find(@Query('search') search: string) {
  return this.createuserservice.find(search);
}

@Get('columnquery')
finds(@Query('userName') userName: string, @Query('fullName') fullName: string ,@Query('location') location: string , @Query('email') email: string, @Query('groupName') groupName: string) {
  return this.createuserservice.finds({ userName, fullName ,location, email, groupName});
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.createuserservice.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: CreateUserdto) {
    return this.createuserservice.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.createuserservice.delete(+id);
  }

  

}
