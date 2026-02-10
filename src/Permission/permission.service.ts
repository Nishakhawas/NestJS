import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/Entity/permission.entity";
import { Repository } from "typeorm";
import { CreatePermissionDto } from "./permission-dto";
import { PermissionAccessDto } from "src/GroupPermission/dto/permissionaccess.dto";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  create(dto: CreatePermissionDto) {
    const permission = this.permissionRepo.create(dto);
    return this.permissionRepo.save(permission);
  }
    findAll(): Promise<Permission[]> {
        return this.permissionRepo.find();
    }

async findOne(id: number): Promise<Permission | null> {
  console.log('Fetching permission with id:', id);
  const permission = await this.permissionRepo.findOneBy({ id });
  console.log('Result:', permission);
  return permission;
}

    async update(id: number, updatePermissionDto: PermissionAccessDto): Promise<Permission> {
      const permission = await this.permissionRepo.findOneBy({ id });
      if (!permission) {
        throw new Error(`permission with ID ${id} not found`);
      }
      Object.assign(permission, updatePermissionDto);
      return this.permissionRepo.save(permission);
    }


    //method for  updating
// async updateMany(updatePermissionsDto: PermissionAccessDto[]): Promise<Permission[]> {
//   const updatedPermissions: Permission[] = [];

//   for (const dto of updatePermissionsDto) {
//     const permission = await this.permissionRepo.findOneBy({ id: dto.permissionId });

//     if (!permission) {
//       throw new NotFoundException(`Permission with ID ${dto.permissionId} not found`);
//     }

//     Object.assign(permission, {
//       create_access: dto.create_access,
//       read_access: dto.read_access,
//       update_access: dto.update_access,
//       delete_access: dto.delete_access,
//     });

//     const saved = await this.permissionRepo.save(permission);
//     updatedPermissions.push(saved);
//   }

//   return updatedPermissions;
// }



//   async updateMany(updatePermissionsDto: PermissionAccessDto[]): Promise<Permission[]> {
//   const updatedPermissions: Permission[] = [];

//   for (const dto of updatePermissionsDto) {
//     const permission = await this.permissionRepo.findOneBy({ id: dto.permissionId });

//     if (!permission) {
//       throw new NotFoundException(`Permission with ID ${dto.permissionId} not found`);
//     }

//     Object.assign(permission, {
//       create_access: dto.create_access,
//       read_access: dto.read_access,
//       update_access: dto.update_access,
//       delete_access: dto.delete_access,
//     });

//     const saved = await this.permissionRepo.save(permission);
//     updatedPermissions.push(saved);
//   }

//   return updatedPermissions;
// }

    
}
