import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Page } from './page.entity';
import { CreatePageDto } from './dto/page.dto';


@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepo: Repository<Page>,
  ) {}


  async createPage(dto: CreatePageDto): Promise<Page> {
  let imageTag = '';

  if (dto.imageUrl) {
    const matches = dto.imageUrl.match(/^data:(image\/[a-z]+);base64,/);
    if (!matches) throw new Error('Invalid image format');

    const ext = matches[1].split('/')[1];
    const base64Data = dto.imageUrl.replace(/^data:image\/\w+;base64,/, '');
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

  const newPage = this.pageRepo.create({
    ...dto,
    imageUrl: imageTag,
  });

  return await this.pageRepo.save(newPage);
}

  async getAllPage(): Promise<Page[]> {
    return await this.pageRepo.find();
  }

  async getPageById(id: number): Promise<Page> {
    const page = await this.pageRepo.findOne({ where: { id } });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

async updatePage(id: number, updatePageDto: CreatePageDto): Promise<Page> {
  const page = await this.pageRepo.findOneBy({ id });
  if (!page) {
    throw new Error(`Page with ID ${id} not found`);
  }
  Object.assign(page, updatePageDto);
  return this.pageRepo.save(page);
}

  async deletePage(id: number): Promise<void> {
    const result = await this.pageRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
  }

  async find(search?: string): Promise<Page[]> {
    const query = this.pageRepo.createQueryBuilder('module');
    if (search) {
      query.where(
        'module.pageMenu LIKE :search OR module.title LIKE :search OR module.shortContent LIKE :search',
        { search: `%${search}%` },
      );
    }
  
    return query.getMany();
  }

async finds(filters: { pageMenu?: string; title?: string ,shortContent?:string, isPublish?:string}) {
  const query = this.pageRepo.createQueryBuilder('user');

  if (filters.pageMenu) {
    query.andWhere('user.pageMenu LIKE :pageMenu', { pageMenu: `%${filters.pageMenu}%` });
  }

  if (filters.title) {
    query.andWhere('user.title LIKE :title', { title: `%${filters.title}%` });
  }

   if (filters.shortContent) {
    query.andWhere('user.shortcontent LIKE :shortcontent', { shortcontent: `%${filters.shortContent}%` });
  }

  if (filters.isPublish) {
    query.andWhere('user.isPublish = :isPublish', { isPublish: filters.isPublish });
  }

  return await query.getMany();
}

}
