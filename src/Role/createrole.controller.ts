import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateRoleService } from "./createrole.service";
import { CreateRoleDto } from "./createrole.dto";
import { Role } from "src/Entity/role.entity";

@Controller('role')
export class CreateRoleController {
  constructor(private roleService: CreateRoleService) {  
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll():Promise<Role[]>{
    return this.roleService.findAll();
  }
}

 