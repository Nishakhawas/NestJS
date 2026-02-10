import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './banner.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { CreateBannerDto } from './dto/banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepo: Repository<Banner>,
  ) {}

  // async createBanner(dto: CreateBannerDto): Promise<Banner> {
  //   const newBanner = this.bannerRepo.create(dto);
  //   return await this.bannerRepo.save(newBanner);
  // }

  async createBanner(dto: CreateBannerDto): Promise<Banner> {
  let imageTag = '';

  if (dto.ImageUrl) {
    const matches = dto.ImageUrl.match(/^data:(image\/[a-z]+);base64,/);
    if (!matches) throw new Error('Invalid image format');

    const ext = matches[1].split('/')[1];
    const base64Data = dto.ImageUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const filename = `banner_${uuidv4()}.${ext}`;
    const uploadDir = path.join(__dirname, '../../uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    
    imageTag = filename; 

  }

  const newBanner = this.bannerRepo.create({
    ...dto,
    ImageUrl: imageTag,
  });

  return await this.bannerRepo.save(newBanner);
}



  async getAllBanners(): Promise<Banner[]> {
    return await this.bannerRepo.find();
  }

  async getBannerById(id: number): Promise<Banner> {
    const banner = await this.bannerRepo.findOne({ where: { id } });
    if (!banner) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }
    return banner;
  }

async updateBanner(id: number, updateBannerrDto: CreateBannerDto): Promise<Banner> {
  const banner = await this.bannerRepo.findOneBy({ id });
  if (!banner) {
    throw new Error(`banner with ID ${id} not found`);
  }
  Object.assign(banner, updateBannerrDto);
  return this.bannerRepo.save(banner);
}

  async deleteBanner(id: number): Promise<void> {
    const result = await this.bannerRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }
  }

  async find(search?: string): Promise<Banner[]> {
    const query = this.bannerRepo.createQueryBuilder('module');
    if (search) {
      query.where(
        'module.bannerHeading LIKE :search OR module.startDate LIKE :search OR module.endDate LIKE :search',
        { search: `%${search}%` },
      );
    }
  
    return query.getMany();
  }

  async finds(filters: {bannerHeading?: string; startDate?: Date,endDate?:Date}) {
  console.log("🚀 ~ BannerService ~ finds ~ filters:", filters)
  const query = this.bannerRepo.createQueryBuilder('banner');

  if (filters.bannerHeading) {
    query.andWhere('banner.bannerHeading LIKE :bannerHeading', { bannerHeading: `%${filters.bannerHeading}%` });
  }

   if (filters.startDate) {
    query.andWhere('banner.startDate >= :startDate', {
      startDate: filters.startDate,
    });
  }
  

  if (filters.endDate) {
    query.andWhere('banner.endDate <= :endDate', {
      endDate: filters.endDate,
    });
  }
 
  return await query.getMany();
}

}
