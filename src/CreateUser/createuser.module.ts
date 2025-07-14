import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUser } from 'src/Entity/createuser.entity';
import { createUserService } from './createuser.service';
import { createUserController } from './createuser.controller';
import { Group } from 'src/Entity/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreateUser,Group]),     
  ],
  controllers: [createUserController], 
  providers: [createUserService], 
  exports: [createUserService], 
})
export class CreateUserController {}
