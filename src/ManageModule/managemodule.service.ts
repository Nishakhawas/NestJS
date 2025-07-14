import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManageModule } from '../Entity/managemodule.entity';
import { CreateManageModuleDto } from './dto/managemodule.dto';

@Injectable()
export class ManageModuleService {
  constructor(
    @InjectRepository(ManageModule)
    private moduleRepo: Repository<ManageModule>,
  ) {}

  async create(createDto: CreateManageModuleDto): Promise<ManageModule> {
    const module = this.moduleRepo.create(createDto);
    return this.moduleRepo.save(module);
  }

  async findAll(): Promise<ManageModule[]> {
    return this.moduleRepo.find();
  }

  async findOne(id: number): Promise<ManageModule> {
    const module = await this.moduleRepo.findOne({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }



async update(id: number, updateModuleDto: CreateManageModuleDto): Promise<ManageModule> {
  const module = await this.moduleRepo.findOneBy({ id });
  if (!module) {
    throw new Error(`Module with ID ${id} not found`);
  }
  Object.assign(module, updateModuleDto);
  return this.moduleRepo.save(module);
}

  async remove(id: number): Promise<void> {
    const result = await this.moduleRepo.delete(id);
    if (!result) throw new NotFoundException('Module not found');
  }


async find(search?: string): Promise<ManageModule[]> {
  const query = this.moduleRepo.createQueryBuilder('module');
  if (search) {
    query.where(
      'module.menu LIKE :search OR module.displayText1 LIKE :search OR module.parentMenu LIKE :search',
      { search: `%${search}%` },
    );
  }

  return query.getMany();
}

async finds(filters: { parentMenu?: string; menu?: string ,displaytext1?:string, displaytext2?:string, menulink?:string}) {
  const query = this.moduleRepo.createQueryBuilder('user');

  if (filters.parentMenu) {
    query.andWhere('user.parentmenu LIKE :parentmenu', { parentmenu: `%${filters.parentMenu}%` });
  }

  if (filters.menu) {
    query.andWhere('user.menu LIKE :menu', { menu: `%${filters.menu}%` });
  }

   if (filters.displaytext1) {
    query.andWhere('user.displaytext1 LIKE :displaytext1', { displaytext1: `%${filters.displaytext1}%` });
  }

  if (filters.displaytext2) {
    query.andWhere('user.displaytext2 LIKE :displaytext1', { displaytext1: `%${filters.displaytext2}%` });
  }

  if (filters.menulink) {
    query.andWhere('user.menulink LIKE :menulink', { menulink: `%${filters.menulink}%` });
  }

  return await query.getMany();
}


}
