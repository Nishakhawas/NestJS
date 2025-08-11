import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManageModule } from '../Entity/managemodule.entity';
import { CreateManageModuleDto } from './dto/managemodule.dto';
import { saveAuditLog } from 'src/Helper Function/commonlog/commonlog.helper';
import { CustomRequest } from 'src/common/types/custom-request.interface';
import { AuditLog } from 'src/Helper Function/commonlog/commonlog.entity';
import { instanceToPlain } from 'class-transformer';
import { Nepequengdate } from 'src/Helper Function/Date/nepequengdate.entity';
import { DateService } from 'src/Helper Function/Date/date.service';
import { formatDateToYMD } from 'src/common/utils/date.utils';
@Injectable()
export class ManageModuleService {
  constructor(
    @InjectRepository(ManageModule)
    private moduleRepo: Repository<ManageModule>,
       @InjectRepository(AuditLog)
        private readonly auditRepo: Repository<AuditLog>,
    @InjectRepository(Nepequengdate)  
    private readonly dateRepo: Repository<Nepequengdate>,
     private readonly dateService: DateService,
      
  ) {}

async create(createDto: CreateManageModuleDto, req: CustomRequest): Promise<ManageModule> {
  const today = new Date();
  const formattedToday = formatDateToYMD(today); // → '2025/08/08'

  const bsDateStr = await this.dateService.getBsDateFromAdDate(formattedToday); // Assume it also returns '2082/04/23'

  const module = this.moduleRepo.create({
    ...createDto,
    postdatead: formattedToday,    // If you're storing AD as string
    postdatebs: bsDateStr || '', // Make sure it's formatted already as YYYY/MM/DD
  });

  const savedModule = await this.moduleRepo.save(module);

  await saveAuditLog(this.auditRepo, {
    tablename: 'manage_module',
    primarykey: 'token',
    primaryid: savedModule.id,
    action: 'Insert',
    dataold: JSON.stringify(module),
    datanew: JSON.stringify(savedModule),
    postby: req.user.email,
    postip: req.ip,
    postmac: req.headers['x-mac-address'] as string,
    locationid: req.user.locationid,
  }, this.dateRepo);
  return savedModule;
}

  

  async findAll(): Promise<ManageModule[]> {
    return this.moduleRepo.find();
  }

  async findOne(id: number): Promise<ManageModule> {
    const module = await this.moduleRepo.findOne({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

async update(id: number, updateModuleDto: CreateManageModuleDto ,req: CustomRequest): Promise<ManageModule> {
  const module = await this.moduleRepo.findOneBy({ id });
  if (!module) {
    throw new Error(`Module with ID ${id} not found`);
  }
  // Copy  BEFORE updating
const originalData = JSON.parse(JSON.stringify(module)); 
  Object.assign(module, updateModuleDto);
  const updatedModule= await this.moduleRepo.save(module);
  // Log the update action
  await saveAuditLog(this.auditRepo, {
    tablename: 'manage_module',
    primarykey: 'token',
    primaryid: id,
    action: 'Update',
    dataold:JSON.stringify(originalData), // old data before update
    datanew: JSON.stringify(updatedModule),
    postby: req.user.email,
    postip: req.ip,
    locationid: req.user.locationid,
  }, this.dateRepo);

  return updatedModule;
}


  async remove(id: number, req: CustomRequest): Promise<void> {
  // Fetch the original module before deleting
  const module = await this.moduleRepo.findOne({
    where: { id },
    // relations: ['children'], 
  });

  if (!module) {
    throw new NotFoundException('Module not found');
  }

  // Convert entity to plain object to avoid circular refs
  const originalData = instanceToPlain(module);

  // Delete the record
  await this.moduleRepo.delete(id);

  // Log the delete action
  await saveAuditLog(this.auditRepo, {
    tablename: 'manage_module',
    primarykey: 'token',
    primaryid: id,
    action: 'Delete',
    dataold: JSON.stringify(originalData),
    datanew: null,
    postby: req.user.email,
    postip: req.ip,
    locationid: req.user.locationid,
  }, this.dateRepo);
}


async find(search?: string): Promise<ManageModule[]> {
  const query = this.moduleRepo.createQueryBuilder('module');
  if (search) {
    query.where(
      'module.menu LIKE :search OR module.displayText1 LIKE :search OR module.parentMenu LIKE :search OR module.postdatead LIKE :search',
      { search: `%${search}%` },
    );
  }

  return query.getMany();
}

async finds(filters: { parentMenu?: string; menu?: string ,displaytext1?:string, displaytext2?:string, menulink?:string ,postdatead?:string}): Promise<ManageModule[]> {
  const query = this.moduleRepo.createQueryBuilder('module');

  if (filters.parentMenu) {
    query.andWhere('module.parentmenu LIKE :parentmenu', { parentmenu: `%${filters.parentMenu}%` });
  }

  if (filters.menu) {
    query.andWhere('module.menu LIKE :menu', { menu: `%${filters.menu}%` });
  }

   if (filters.displaytext1) {
    query.andWhere('module.displaytext1 LIKE :displaytext1', { displaytext1: `%${filters.displaytext1}%` });
  }

  if (filters.displaytext2) {
    query.andWhere('module.displaytext2 LIKE :displaytext1', { displaytext1: `%${filters.displaytext2}%` });
  }

  if (filters.menulink) {
    query.andWhere('module.menulink LIKE :menulink', { menulink: `%${filters.menulink}%` });
  }
   if (filters.postdatead) {
    query.andWhere('module.postdatead LIKE :postdatead', { postdatead: `%${filters.postdatead}%` });
    
  }
   console.log("🚀 ~ ManageModuleService ~ finds ~ filters.postdatead:", filters.postdatead)

  

  return await query.getMany();
}



// async getGroupedMenu(): Promise<any[]> {
//   const modules = await this.moduleRepo.find({
//     where: { isActive: true },
//     order: { menuOrder: 'ASC' },
//   });

//   const groupedMap = new Map<string, any>();

//   for (const mod of modules) {
//     if (!groupedMap.has(mod.parentMenu)) {
//       groupedMap.set(mod.parentMenu, {
//         name: mod.parentMenu,
//         iconClass: '',
//         submenu: [],
//       });
//     }

//     // Add the module to the corresponding parent menu
//     groupedMap.get(mod.parentMenu).submenu.push({
//       title: mod.menu,
//       route: mod.menuLink,
//     });
//   }
  

//   return Array.from(groupedMap.values());
// }


// async getGroupedMenu(): Promise<any[]> {
//   const allParentMenus = await this.moduleRepo
//     .createQueryBuilder('module')
//     .select('DISTINCT module.parentMenu', 'parentMenu')
//     .addSelect('module.menuIcon', 'menuIcon')
//     .getRawMany();

//   const activeModules = await this.moduleRepo.find({
//     where: { isActive: true },
//     order: { menuOrder: 'ASC' },
//   });

//   const groupedMap = new Map<string, any>();

//   for (const row of allParentMenus) {
//     groupedMap.set(row.parentMenu, {
//       name: row.parentMenu,
//       iconClass: row.menuIcon,
//       submenu: [],
//     });
//   }

//   for (const mod of activeModules) {
//     const parent = mod.parentMenu
//     if (groupedMap.has(parent)) {
//       groupedMap.get(parent).submenu.push({
//         title: mod.menu,
//         route: mod.menuLink,
//       });
//     }
//   }

//   return Array.from(groupedMap.values());
// }

async getGroupedMenu(): Promise<any[]> {

  // 1. Get distinct parentMenus
  const distinctParentMenus = await this.moduleRepo
    .createQueryBuilder('module')
    .select('DISTINCT module.parentMenu', 'parentMenu')
    .getRawMany();

  // 2. For each parentMenu, get the icon from the first active module
  const activeModules = await this.moduleRepo.find({
    // where: { isActive: true },
    order: { menuOrder: 'ASC' },
  });

  // Map parentMenu to icon
  const parentMenuIconMap = new Map<string, string>();

  for (const mod of activeModules) {
    if (!parentMenuIconMap.has(mod.parentMenu)) {
      parentMenuIconMap.set(mod.parentMenu, mod.menuIcon);
    }
  }

  // Step 3: Build grouped map with parentMenus + icon + empty submenu
  const groupedMap = new Map<string, any>();
  for (const row of distinctParentMenus) {
    groupedMap.set(row.parentMenu, {
      name: row.parentMenu,
      iconClass: parentMenuIconMap.get(row.parentMenu) || '',
      submenu: [],
    });
  }

  // Step 4: Push submenus into grouped map
  for (const mod of activeModules) {
    const parent = mod.parentMenu;
    if (groupedMap.has(parent)) {
      groupedMap.get(parent).submenu.push({
        title: mod.menu,
        route: mod.menuLink,
      });
    }
  }

  // Convert map values to array
  return Array.from(groupedMap.values());
}


}
