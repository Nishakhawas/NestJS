// auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entity/user.entity'; // adjust path as needed
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Role } from 'src/Entity/role.entity';
// import { RoleService } from 'src/RolePermission/rolepermission.service';
import { Permission } from 'src/Entity/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role,Permission]),  // <-- THIS LINE IS CRUCIAL    
  ],
  controllers: [UserController], // Add your controllers here if needed
  providers: [UserService], // Add your services here
  exports: [UserService], 
})
export class UserModule {}
