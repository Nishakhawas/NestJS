import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { groupService } from './group.service';
import { CreateGroupDto } from './dto/group.dto';

@Controller('group')
export class groupController {
  constructor(private readonly groupService: groupService) {}

//   @Post()
//   create(@Body() createDto: CreateGroupDto) {
//     return this.groupService.create(createDto);
//   }

@Post()
async create(@Body() dto: CreateGroupDto) {
  const createdGroup = await this.groupService.create(dto);
  return {
    message: 'Group successfully created',
    data: createdGroup,
  };
}


  @Get()
  findAll() {
    return this.groupService.findAll();
  }
  
    @Get('search')
async find(@Query('search') search: string) {
  return this.groupService.find(search);
}

@Get('columnquery')
finds(@Query('groupName') groupName: string, @Query('groupCode') groupCode: string ,@Query('location') location: string , @Query('remarks') remarks: string) {
  return this.groupService.finds({ groupName, groupCode ,location, remarks});
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: CreateGroupDto) {
    return this.groupService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }

  

}
