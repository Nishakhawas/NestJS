import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/Entity/group.entity';
import { groupController } from './group.controller';
import { groupService } from './group.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),     
  ],
  controllers: [groupController], 
  providers: [groupService], 
  exports: [groupService], 
})
export class group {}
