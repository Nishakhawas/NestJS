import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entity/user.entity'; // adjust path as needed
import { Role } from 'src/Entity/role.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from 'src/Entity/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role,Permission]),  // <-- THIS LINE IS CRUCIAL    
  ],
  controllers: [PermissionController], 
  providers: [PermissionService], 
  exports: [PermissionService], 
})
export class PermissionModule {}
