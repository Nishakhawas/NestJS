// auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entity/user.entity'; // adjust path as needed
import { Role } from 'src/Entity/role.entity';
import { CreateRoleController } from './createrole.controller';
import { CreateRoleService } from './createrole.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),  // <-- THIS LINE IS CRUCIAL    
  ],
  controllers: [CreateRoleController], 
  providers: [CreateRoleService], 
  exports: [CreateRoleService], 
})
export class CreateRoleModule {}
