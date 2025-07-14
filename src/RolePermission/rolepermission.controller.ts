// import { Body, Controller, Get, Post } from "@nestjs/common";
// import { RoleService } from "./rolepermission.service";
// import { Role } from "src/Entity/role.entity";
// import { CreateRolePermissionDto } from "./rolepermission.dto";

// @Controller('roles')
// export class RoleController {
//   constructor(private roleService: RoleService) {  
//   }

//   @Post()
//   create(@Body() createRoleDto: CreateRolePermissionDto): Promise<Role> {
//     return this.roleService.create(createRoleDto);
//   }

//   @Get()
//   findAll(): Promise<Role[]> {
//     return this.roleService.findAll();
//   }   
// }
