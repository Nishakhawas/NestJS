import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGroupDto } from "./dto/group.dto";
import { Group } from "src/Entity/group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class groupService {
  constructor(
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,

  ) {}

  async create(createDto: CreateGroupDto): Promise<Group> {
    const module = this.groupRepo.create(createDto);
    return this.groupRepo.save(module);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepo.find();
  }


  
  async findOne(id: number): Promise<Group> {
    const module = await this.groupRepo.findOne({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }



async update(id: number, updateModuleDto: CreateGroupDto): Promise<Group> {
  const module = await this.groupRepo.findOneBy({ id });
  if (!module) {
    throw new Error(`Module with ID ${id} not found`);
  }
  Object.assign(module, updateModuleDto);
  return this.groupRepo.save(module);
}

  async remove(id: number): Promise<void> {
    const result = await this.groupRepo.delete(id);
    if (!result) throw new NotFoundException('Module not found');
  }

  async find(search?: string): Promise<Group[]>{
    const query = this.groupRepo.createQueryBuilder('module');
    if (search) {
      query.where(
        'module.groupName LIKE :search OR module.groupCode LIKE :search OR module.location LIKE :search OR module.remarks LIKE :search',
        { search: `%${search}%` },
      );
    }
    return query.getMany();
  }

  

async finds(filters: { groupName?: string; groupCode?: string ,location?:string, remarks?:string, menulink?:string}) {
  const query = this.groupRepo.createQueryBuilder('user');

  if (filters.groupName) {
    query.andWhere('user.groupname LIKE :groupname', { groupname: `%${filters.groupName}%` });
  }

  if (filters.groupCode) {
    query.andWhere('user.groupcode LIKE :groupcode', { groupcode: `%${filters.groupCode}%` });
  }

   if (filters.location) {
    query.andWhere('user.location LIKE :location', { location: `%${filters.location}%` });
  }

  if (filters.remarks) {
    query.andWhere('user.remarks LIKE :remarks', {remarks: `%${filters.remarks}%` });
  }

  return await query.getMany();
}



}