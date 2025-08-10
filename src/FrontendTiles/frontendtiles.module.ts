import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendTile } from './frontendtiles.entity';
import { FrontendTilesService } from './frontendtiles.service';
import { FrontendTilesController } from './frontendtiles.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([FrontendTile]),
  ],
  controllers: [FrontendTilesController],
  providers: [FrontendTilesService],
  exports: [FrontendTilesService],
})
export class FrontendTilesModule {}

