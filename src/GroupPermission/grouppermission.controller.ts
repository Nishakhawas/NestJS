import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateGroupPermissionDto } from "./dto/creategrouppermission.dto";
import { Group } from "src/Entity/group.entity";
import { GroupPermissionService } from "./grouppermission.service";
import { PermissionAccessDto } from "./dto/permissionaccess.dto";

@Controller('grouppermission')
export class GroupPermissionController {
  constructor(private groupService: GroupPermissionService) {  
  }

  @Post()
  create(@Body() creategroupDto: CreateGroupPermissionDto): Promise<Group> {
    return this.groupService.create(creategroupDto);
  }

  @Get()
  findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

@Get(':id')
findOne(@Param('id') id: number) {
  return this.groupService.findOne(+id);
}

@Put(':id/permissions')
async updateGroupPermissions(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: CreateGroupPermissionDto
) {
  return this.groupService.updateGroupPermissions(id, dto.permissions);
}

// @Put(':groupId/permissions/:permissionId')
// async updateSingleAccess(
//   @Param('groupId', ParseIntPipe) groupId: number,
//   @Param('permissionId', ParseIntPipe) permissionId: number,
//   @Body() dto: PermissionAccessDto
// ) {
//   return this.groupService.updateGroupPermissionAccess(groupId, permissionId, dto);
// }

    
}



















