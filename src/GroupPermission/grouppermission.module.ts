import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/Entity/group.entity';
import { GroupPermissionController } from './grouppermission.controller';
import { GroupPermissionService } from './grouppermission.service';
import { CreateUser } from 'src/Entity/createuser.entity';
import { Permission } from 'src/Entity/permission.entity';
import { GroupPermission } from 'src/Entity/grouppermission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group,CreateUser,Permission,GroupPermission]),     
  ],
  controllers: [GroupPermissionController], 
  providers: [GroupPermissionService], 
  exports: [GroupPermissionService], 
})
export class GroupPermissionModule {}
