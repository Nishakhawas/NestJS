import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageModuleService } from './managemodule.service';
import { ManageModuleController } from './managemodule.controller';
import { ManageModule } from '../Entity/managemodule.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([ManageModule]),   
  ],
  controllers: [ManageModuleController], 
  providers: [ManageModuleService], 
  exports: [ManageModuleService], 
})
export class managemodule {}
