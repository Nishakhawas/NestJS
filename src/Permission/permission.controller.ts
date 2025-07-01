import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePermissionDto } from "./permission-dto";
import { PermissionService } from "./permission.service";

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
}
