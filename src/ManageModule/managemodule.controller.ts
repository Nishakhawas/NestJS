import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { ManageModuleService } from './managemodule.service';
import { CreateManageModuleDto } from './dto/managemodule.dto';
import { CustomRequest } from 'src/common/types/custom-request.interface';
import { JwtAuthGuard } from 'src/UserLogin/jwt-auth.guard';
// import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ManageModuleController {
  constructor(private readonly moduleService: ManageModuleService) {}

 @UseGuards(JwtAuthGuard)  
  @Post()
  create(@Body() createDto: CreateManageModuleDto, @Req() req: CustomRequest) {
    return this.moduleService.create(createDto, req);
  }

  @Get()
  findAll() {
    return this.moduleService.findAll();
  }
 
@Get('menu-grouped')
getGroupedMenu() {
  return this.moduleService.getGroupedMenu();
}


//   @Get('formatted-menu')
// async getFormattedMenu() {
//   return this.moduleService.getFormattedMenu();
// }

@Get('query')
finds(@Query('parentMenu') parentMenu: string, @Query('menu') menu: string ,@Query('displayText1') displaytext1: string , @Query('displayText2') displaytext2: string , @Query('menuLink') menulink: string, @Query('postdatead') postdatead: string) {
  return this.moduleService.finds({ parentMenu, menu ,displaytext1, displaytext2,menulink, postdatead});
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
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDto: CreateManageModuleDto,@Req() req: CustomRequest) {
    return this.moduleService.update(+id, updateDto, req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string ,@Req() req: CustomRequest) {
    return this.moduleService.remove(+id, req);
  }

  

}
