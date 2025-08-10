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
import { CreatePageDto} from './dto/page.dto';
import { PageService } from './page.service';
import { Page } from './page.entity';


@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  async create(@Body() dto: CreatePageDto): Promise<Page> {
    return await this.pageService.createPage(dto);
  }

  @Get()
  async findAll(): Promise<Page[]> {
    return await this.pageService.getAllPage();
  }

  @Get('search')
async find(@Query('search') search: string) {
  return this.pageService.find(search);
}

  @Get('columnquery')
  finds(@Query('pageMenu') pageMenu: string, @Query('title') title: string ,@Query('shortContent') shortContent: string ) {
    return this.pageService.finds({ pageMenu, title ,shortContent});
  }

  
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Page> {
    return await this.pageService.getPageById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePageDto,
  ): Promise<Page> {
    return await this.pageService.updatePage(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.pageService.deletePage(id);
  }
}
