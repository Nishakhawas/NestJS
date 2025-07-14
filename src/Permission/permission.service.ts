import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/Entity/permission.entity";
import { Repository } from "typeorm";
import { CreatePermissionDto } from "./permission-dto";

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

    async update(id: number, updatePermissionDto: CreatePermissionDto): Promise<Permission> {
      const permission = await this.permissionRepo.findOneBy({ id });
      if (!permission) {
        throw new Error(`permission with ID ${id} not found`);
      }
      Object.assign(permission, updatePermissionDto);
      return this.permissionRepo.save(permission);
    }
    
}
