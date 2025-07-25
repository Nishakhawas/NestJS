import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
  ) {}


  async createTeam(dto: CreateTeamDto): Promise<Team> {
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

  const newTeam = this.teamRepo.create({
    ...dto,
    imageUrl: imageTag,
  });

  return await this.teamRepo.save(newTeam);
}

  async getAllTeam(): Promise<Team[]> {
    return await this.teamRepo.find();
  }

  async getTeamById(id: number): Promise<Team> {
    const banner = await this.teamRepo.findOne({ where: { id } });
    if (!banner) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }
    return banner;
  }

async updateTeam(id: number, updateTeamDto: CreateTeamDto): Promise<Team> {
  const banner = await this.teamRepo.findOneBy({ id });
  if (!banner) {
    throw new Error(`banner with ID ${id} not found`);
  }
  Object.assign(banner, updateTeamDto);
  return this.teamRepo.save(banner);
}

  async deleteTeam(id: number): Promise<void> {
    const result = await this.teamRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }
  }

//   async find(search?: string): Promise<Team[]> {
//     const query = this.teamRepo.createQueryBuilder('module');
//     if (search) {
//       query.where(
//         'module.bannerHeading LIKE :search OR module.startDate LIKE :search OR module.endDate LIKE :search',
//         { search: `%${search}%` },
//       );
//     }
  
//     return query.getMany();
//   }

//   async finds(filters: {bannerHeading?: string; startDate?: Date,endDate?:Date}) {
//   console.log("🚀 ~ BannerService ~ finds ~ filters:", filters)
//   const query = this.teamRepo.createQueryBuilder('banner');

//   if (filters.bannerHeading) {
//     query.andWhere('banner.bannerHeading LIKE :bannerHeading', { bannerHeading: `%${filters.bannerHeading}%` });
//   }

//    if (filters.startDate) {
//     query.andWhere('banner.startDate >= :startDate', {
//       startDate: filters.startDate,
//     });
//   }
  

//   if (filters.endDate) {
//     query.andWhere('banner.endDate <= :endDate', {
//       endDate: filters.endDate,
//     });
//   }
 
//   return await query.getMany();
// }

}
