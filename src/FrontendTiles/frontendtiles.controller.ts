import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { FrontendTilesService } from './frontendtiles.service';
import { FrontendTile } from './frontendtiles.entity';
import { CreateTileDto } from './dto/frontendtiles.dto';



@Controller('tiles')
export class FrontendTilesController {
  constructor(private readonly tileService: FrontendTilesService) {}

  @Post()
  async create(@Body() dto: CreateTileDto): Promise<FrontendTile> {
    return await this.tileService.createTile(dto);
  }

  @Get()
  async findAll(): Promise<FrontendTile[]> {
    return await this.tileService.getAllTiles();
  }

  @Get('search')
async find(@Query('search') search: string) {
  return this.tileService.find(search);
}

  @Get('columnquery')
  finds(@Query('title') title: string,  @Query('content') content: string, @Query('icon') icon: string, @Query('order') order: number, ) {
    return this.tileService.finds({ title, content,icon, order });
  }

//   @Get('columnquery')
//  finds(
//   @Query('title') title?: string,
//   @Query('icon') icon?: string,
//   @Query('content') content?: string,
//   @Query('order') order?: string,
// ) {
//   const parsedOrder = order !== '' && order !== undefined ? Number(order) : undefined;
//   return this.tileService.finds({
//     title,
//     icon,
//     content,
//     order: parsedOrder,
//   });
// }

  
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<FrontendTile> {
    return await this.tileService.getTileById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateTileDto,
  ): Promise<FrontendTile> {
    return await this.tileService.updateTile(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.tileService.deleteTile(id);
  }
}
