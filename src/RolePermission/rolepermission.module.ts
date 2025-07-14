// // auth.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../Entity/user.entity'; // adjust path as needed
// import { Role } from 'src/Entity/role.entity';
// import { RoleController } from './rolepermission.controller';
// import { Permission } from 'src/Entity/permission.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User,Role,Permission]),  // <-- THIS LINE IS CRUCIAL    
//   ],
//   controllers: [RoleController], 
//   providers: [], 
//   exports: [], 
// })
// export class RoleModule {}
