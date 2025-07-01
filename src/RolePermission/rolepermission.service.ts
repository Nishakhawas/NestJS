import {  Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { register } from "module";
import { Role } from "src/Entity/role.entity";
import { User } from "src/Entity/user.entity";
import { Repository } from "typeorm";
import { CreateRolePermissionDto } from "./rolepermission.dto";
import { Permission } from "src/Entity/permission.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  
    // Method to create a new role and add permission

async create(createRoleDto: CreateRolePermissionDto): Promise<Role> {
  const { name, permissions } = createRoleDto;

  /// Fetch the role by name  and await it!
  const role = await this.roleRepo.findOne({
    where: { name },
    relations: ['permissions'],
  });


  if (!role) {
    throw new NotFoundException(`Role '${name}' not found`);
  }

  //  Fetch all new permission entities
  const newPermissionEntities = await Promise.all(
    permissions.map(async (permissionId) => {
      const res = await this.permissionRepo.findOne({ where: { id: permissionId } });
      if (!res) {
        throw new NotFoundException(`Permission with ID ${permissionId} not found`);
      }
      return res;
    })
  );

  // Merge without duplicates
  const mergedPermissions = [
    ...role.permissions,
    ...newPermissionEntities.filter(
      p => !role.permissions.some(existing => existing.id === p.id)
    )
  ];

  role.permissions = mergedPermissions;

  // Save updated role
  return await this.roleRepo.save(role);
}

  // Method to find all roles
  findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }
 
}


