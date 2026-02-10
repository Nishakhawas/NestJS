import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/Entity/group.entity';


import { GroupPermission } from 'src/Entity/grouppermission.entity';
import { Nepequengdate } from './nepequengdate.entity';
import { DateController } from './date.controller';
import { DateService } from './date.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nepequengdate]),     
  ],
  controllers: [DateController], 
  providers: [DateService], 
  exports: [DateService], 
})
export class DateModule {}
