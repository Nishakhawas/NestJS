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
}
