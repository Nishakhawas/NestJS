import {  Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Permission } from "src/Entity/permission.entity";
import { CreateGroupPermissionDto } from "./dto/creategrouppermission.dto";
import { Group } from "src/Entity/group.entity";
import { CreateUser } from "src/Entity/createuser.entity";
import { CreatePermissionDto } from "src/Permission/permission-dto";
import { PermissionAccessDto } from "./dto/permissionaccess.dto";
import { GroupPermission } from "src/Entity/grouppermission.entity";

@Injectable()
export class GroupPermissionService {
  constructor(
    @InjectRepository(CreateUser)
    private userRepo: Repository<CreateUser>,
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(GroupPermission)
    private groupPermissionRepo: Repository<GroupPermission>
  ) {}
  
// Method to create a new group and add permission

async create(createGroupDto: CreateGroupPermissionDto): Promise<Group> {
  const { name, permissions } = createGroupDto;

  /// Fetch the group by name  and await it!
  const group = await this.groupRepo.findOne({
    where: { groupName: name },
    relations: ['permissions'],
  });

  if (!group) {
    throw new NotFoundException(`Group '${name}' not found`);
  }


  // fetch permission with id
 const fetchedPermissions = await this.permissionRepo.findByIds(permissions);
  group.permissions = fetchedPermissions;

  // Save updated group
  return await this.groupRepo.save(group);


}

  // Method to find all groups
  findAll(): Promise<Group[]> {
    return this.groupRepo.find({
       relations: ['permissions'],
    });
  }
 
  async findOne(groupId: number): Promise<Group> {
  const group = await this.groupRepo.findOne({
    where: { id: groupId },
    relations: ['permissions'],
  });

  if (!group) {
    throw new NotFoundException(`Group with ID '${groupId}' not found`);
  }

  return group;
}


//Update Permissions
async updateGroupPermissions(groupId: number, permissionIds: number[]): Promise<Group> {
  const group = await this.groupRepo.findOne({
    where: { id: groupId },
    relations: ['permissions'],
  });

  if (!group) {
    throw new NotFoundException(`Group with ID '${groupId}' not found`);
  }

  // Fetch all permission entities by the provided IDs
  const permissions = await this.permissionRepo.find({
    where: { id: In(permissionIds) },
  });

  // Update the group's permissions
  group.permissions = permissions;

  // Save updated group
  return await this.groupRepo.save(group);
}


// async updateGroupPermissionAccess(
//   groupId: number,
//   permissionId: number,
//   accessDto: PermissionAccessDto,
// ): Promise<GroupPermission> {
//   console.log('GroupPermission not found:', groupId, permissionId);

//   const groupPermission = await this.groupPermissionRepo.findOne({
//     where: {
//       group: { id: groupId },
//       permission: { id: permissionId },
//     },
//     relations: ['group', 'permission'],
//   });

//   if (!groupPermission) {
//     throw new NotFoundException(`Permission ${permissionId} not found for Group ${groupId}`);
//   }

//   groupPermission.create_access = accessDto.create_access;
//   groupPermission.read_access = accessDto.read_access;
//   groupPermission.update_access = accessDto.update_access;
//   groupPermission.delete_access = accessDto.delete_access;

//   return await this.groupPermissionRepo.save(groupPermission);
// }

// async updateGroupPermissionAccess(
//   groupId: number,
//   permissionId: number,
//   accessDto: PermissionAccessDto,
// ): Promise<GroupPermission> {
//   console.log('Updating GroupPermission:', groupId, permissionId);

//   const groupPermission = await this.groupPermissionRepo.findOne({
//     where: {
//       group: { id: groupId },
//       permission: { id: permissionId },
//     },
//     relations: ['group', 'permission'],
//   });

//   if (!groupPermission) {
//     throw new NotFoundException(`Permission ${permissionId} not found for Group ${groupId}`);
//   }

//   groupPermission.create_access = accessDto.create_access;
//   groupPermission.read_access = accessDto.read_access;
//   groupPermission.update_access = accessDto.update_access;
//   groupPermission.delete_access = accessDto.delete_access;

//   // ✅ Use the correct repo
//   return await this.groupPermissionRepo.save(groupPermission);
// }




}


  //  Fetch all new permission entities
  // const newPermissionEntities = await Promise.all(
  //   permissions.map(async (permissionId) => {
  //     const res = await this.permissionRepo.findOne({ where: { id: permissionId } });
  //     if (!res) {
  //       throw new NotFoundException(`Permission with ID ${permissionId} not found`);
  //     }
  //     return res;
  //   })
  // );

  // // Merge without duplicates
  // const mergedPermissions = [
  //   ...group.permissions,
  //   ...newPermissionEntities.filter(
  //     p => !group.permissions.some(existing => existing.id === p.id)
  //   )
  // ];