import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { AuditLog } from 'src/Helper Function/commonlog/commonlog.entity';
import { Nepequengdate } from 'src/Helper Function/Date/nepequengdate.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([Team, AuditLog, Nepequengdate]),     
  ],
  controllers: [TeamController], 
  providers: [TeamService,], 
  exports: [TeamService], 
})
export class TeamModule {}
