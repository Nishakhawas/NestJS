import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreatePermissionDto } from "./permission-dto";
import { PermissionService } from "./permission.service";
import { Permission } from "src/Entity/permission.entity";

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post() 
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto);
  }
  @Get()
  findAll() : Promise<CreatePermissionDto[]> {
    return this.permissionService.findAll();
  }


 @Get(':id')
async findOne(@Param('id',ParseIntPipe) id: number): Promise<Permission> {
  const permission = await this.permissionService.findOne(id); // +id to cast to number

  if (!permission) {
    throw new NotFoundException(`Customer with ID ${id} not found`);
  }

  return permission;
}

  @Put(':id')
  async update( 
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    const permission = await this.permissionService.findOne(id);
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return this.permissionService.update(id, updatePermissionDto);
  }
  


}
