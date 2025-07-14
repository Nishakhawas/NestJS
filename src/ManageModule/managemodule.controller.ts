import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ManageModuleService } from './managemodule.service';
import { CreateManageModuleDto } from './dto/managemodule.dto';
// import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ManageModuleController {
  constructor(private readonly moduleService: ManageModuleService) {}

  @Post()
  create(@Body() createDto: CreateManageModuleDto) {
    return this.moduleService.create(createDto);
  }

  @Get()
  findAll() {
    return this.moduleService.findAll();
  }
  
@Get('query')
finds(@Query('parentMenu') parentMenu: string, @Query('menu') menu: string ,@Query('displayText1') displaytext1: string , @Query('displayText2') displaytext2: string , @Query('menuLink') menulink: string) {
  return this.moduleService.finds({ parentMenu, menu ,displaytext1, displaytext2,menulink});
}

@Get('search')
async find(@Query('search') search: string) {
  return this.moduleService.find(search);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: CreateManageModuleDto) {
    return this.moduleService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleService.remove(+id);
  }

  

}
