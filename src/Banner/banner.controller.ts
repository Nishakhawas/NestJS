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
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { Banner } from './banner.entity';
import { CreateBannerDto } from './dto/banner.dto';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  async create(@Body() dto: CreateBannerDto): Promise<Banner> {
    return await this.bannerService.createBanner(dto);
  }

  @Get()
  async findAll(): Promise<Banner[]> {
    return await this.bannerService.getAllBanners();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Banner> {
    return await this.bannerService.getBannerById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateBannerDto,
  ): Promise<Banner> {
    return await this.bannerService.updateBanner(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.bannerService.deleteBanner(id);
  }
}
