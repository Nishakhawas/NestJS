import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailConfig } from "./email.entity";
import { EmailConfigService } from "./emailconfig.service";
import { EmailConfigController } from "./emailconfig.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EmailConfig])],
  providers: [EmailConfigService],
  controllers: [EmailConfigController], // if you have one
})
export class EmailConfigModule {}
