import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/Entity/role.entity";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./createrole.dto";

@Injectable()
export class CreateRoleService {
  constructor(  
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,  
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {   
    try{
        const Role = this.roleRepo.create(createRoleDto);
     return await this.roleRepo.save(Role);
    }
   catch(error:any){
      console.error('🔥 Full error:', error); 
       const sqlMsg = error.sqlMessage || error.message || error.driverError?.sqlMessage|| '';
     if(error.code==='ER_DUP_ENTRY'){
       if(sqlMsg.includes('role')){
       console.log('🚨 Throwing ConflictException: Role is already taken');
         throw new ConflictException('Role is already taken')
       }
       else{
         throw new ConflictException('Duplicate Entry')
       }
     }
     throw new InternalServerErrorException('Something went wrong')
   
   }
  
   }

    // Method to find all roles
  findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }
 
}