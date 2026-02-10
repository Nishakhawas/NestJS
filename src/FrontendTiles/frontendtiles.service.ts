import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FrontendTile } from './frontendtiles.entity';
import { CreateTileDto } from './dto/frontendtiles.dto';


@Injectable()
export class FrontendTilesService {
  constructor(
    @InjectRepository(FrontendTile)
    private readonly tileRepo: Repository<FrontendTile>,
  ) {}


  async createTile(dto: CreateTileDto): Promise<FrontendTile> {
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

  const newTile = this.tileRepo.create({
    ...dto,
    imageUrl: imageTag,
  });

  return await this.tileRepo.save(newTile);
}

  async getAllTiles(): Promise<FrontendTile[]> {
    return await this.tileRepo.find();
  }

  async getTileById(id: number): Promise<FrontendTile> {
    const tile = await this.tileRepo.findOne({ where: { id } });
    if (!tile) {
      throw new NotFoundException(`Tile with ID ${id} not found`);
    }
    return tile;
  }

async updateTile(id: number, updateTileDto: CreateTileDto): Promise<FrontendTile> {
  const tile = await this.tileRepo.findOneBy({ id });
  if (!tile) {
    throw new Error(`Tile with ID ${id} not found`);
  }
  Object.assign(tile, updateTileDto);
  return this.tileRepo.save(tile);
}


  async deleteTile(id: number): Promise<void> {
    const result = await this.tileRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tile with ID ${id} not found`);
    }
  }

  async find(search?: string): Promise<FrontendTile[]> {
    const query = this.tileRepo.createQueryBuilder('module');
    if (search) {
      query.where(
        'module.title LIKE :search OR module.content LIKE :search OR module.order LIKE :search OR module.icon LIKE :search',
        { search: `%${search}%` },
      );
    }
  
    return query.getMany();
  }

async finds(filters: { title?: string; icon?: string ; content?: string ;  order?: number }) {
  const query = this.tileRepo.createQueryBuilder('tile');

  if (filters.title) {
    query.andWhere('tile.title LIKE :title', { title: `%${filters.title}%` });
  }

   if (filters.icon) {
    query.andWhere('tile.icon LIKE :icon', { icon: `%${filters.icon}%` });
  }

  if (filters.content) {
    query.andWhere('tile.content LIKE :content', { content: `%${filters.content}%` });
  }


  if (filters.order !== undefined && filters.order !== null) {
  query.andWhere('tile.order = :order', { order: filters.order });
}

  console.log("🚀 ~ FrontendTilesService ~ finds ~ filters:", filters)
  console.log("🚀 ~ FrontendTilesService ~ finds ~ order:", filters.order)


  
  return await query.getMany();
}

}