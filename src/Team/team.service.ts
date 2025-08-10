import { Body, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/team.dto';
import { AuditLog } from 'src/Helper Function/commonlog/commonlog.entity';
import { saveAuditLog } from 'src/Helper Function/commonlog/commonlog.helper';
import { CustomRequest } from '../common/types/custom-request.interface';
import moment from 'moment';
import { Nepequengdate } from 'src/Helper Function/Date/nepequengdate.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
    @InjectRepository(AuditLog)
    private readonly auditRepo: Repository<AuditLog>,
    @InjectRepository(Nepequengdate)  
        private readonly dateRepo: Repository<Nepequengdate>,
  
  ) {}


  async createTeam(dto: CreateTeamDto, req: CustomRequest): Promise<Team> {
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


 const savedTeam = await this.teamRepo.save(newTeam);
 //  Log the create
  await saveAuditLog(this.auditRepo, {
  tablename: 'team',
  primarykey: 'token',
  primaryid: savedTeam.id,
  action: 'Insert',
  dataold: null,
  datanew: savedTeam,
  postby: req.user.email,
  postip: req.ip,
  postmac: req.headers['x-mac-address'] as string,
  locationid: req.user.locationid,
  
}, this.dateRepo);

     return savedTeam;
  
}


  async getAllTeam(): Promise<Team[]> {
    return await this.teamRepo.find();
  }

  async getTeamById(id: number): Promise<Team> {
    const team = await this.teamRepo.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

// async updateTeam(id: number, updateTeamDto: CreateTeamDto,req:any): Promise<Team> {
//   const team = await this.teamRepo.findOneBy({ id });
//   if (!team) {
//     throw new Error(`Team with ID ${id} not found`);
//   }
//   Object.assign(team, updateTeamDto);
//   return this.teamRepo.save(team);
// }

async updateTeam(id: number, updateTeamDto: CreateTeamDto, req: CustomRequest): Promise<Team> {
  const team = await this.teamRepo.findOneBy({ id });
  if (!team) {
    throw new Error(`Team with ID ${id} not found`);
  }

  Object.assign(team, updateTeamDto);
  const updatedTeam = await this.teamRepo.save(team);

  // Log the update action
  await saveAuditLog(this.auditRepo, {
    tablename: 'teams',
    primarykey: 'id',
    primaryid: id,
    action: 'Update',
    dataold: team, // old data before update
    datanew: updatedTeam,
    postby: req.user.email,
    postip: req.ip,
    // postmac: req.headers['x-mac-address'] ,
    locationid: req.user.locationid,
  }, this.dateRepo);

  return updatedTeam;
}


async deleteTeam(id: number): Promise<void> {
    const result = await this.teamRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
  }

  async find(search?: string): Promise<Team[]> {
    const query = this.teamRepo.createQueryBuilder('module');
    if (search) {
      query.where(
        'module.name LIKE :search OR module.designation LIKE :search OR module.phone LIKE :search OR module.email LIKE :search',
        { search: `%${search}%` },
      );
    }
  
    return query.getMany();
  }

async finds(filters: { name?: string; designation?: string ,phone?:string,email?:string}) {
  const query = this.teamRepo.createQueryBuilder('user');

  if (filters.name) {
    query.andWhere('user.name LIKE :name', { name: `%${filters.name}%` });
  }

  if (filters.designation) {
    query.andWhere('user.designation LIKE :designation', { designation: `%${filters.designation}%` });
  }

  if (filters.phone) {
    query.andWhere('user.phone LIKE :phone', { phone: `%${filters.phone}%` });
  }

   if (filters.email) {
     query.andWhere('user.email LIKE :email', { email: `%${filters.email}%` });
   }

  return await query.getMany();
}

}
