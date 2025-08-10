import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageModuleService } from './managemodule.service';
import { ManageModuleController } from './managemodule.controller';
import { ManageModule } from '../Entity/managemodule.entity';
import { AuditLog } from 'src/Helper Function/commonlog/commonlog.entity';
import { Nepequengdate } from 'src/Helper Function/Date/nepequengdate.entity';
import { DateService } from 'src/Helper Function/Date/date.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([ManageModule,AuditLog,Nepequengdate]),   
  ],
  controllers: [ManageModuleController], 
  providers: [ManageModuleService,DateService], 
  exports: [ManageModuleService], 
})
export class manageModule {}