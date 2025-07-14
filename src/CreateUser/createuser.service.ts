import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUser } from "src/Entity/createuser.entity";
import { Group } from "src/Entity/group.entity";
import { Repository } from "typeorm";
import { CreateUserdto } from "./dto/createuser.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class createUserService {
  constructor(

  @InjectRepository(Group)
    private groupRepo: Repository<Group>,
      @InjectRepository(CreateUser)
  private  readonly createuserRepo: Repository<CreateUser>,
  ) {}


  // Create user
  async create(createUserDto: CreateUserdto): Promise<CreateUser | null> {
  const {
    userName,
    userEmail,
    password,
    confirmPassword,
    fullName,
    contact,
    employee,
    location,
    department,
    groupId,
  } = createUserDto;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password && confirmPassword, 10);

  // Check for duplicate username or email
  const existingUser = await this.createuserRepo.findOne({
    where: [{ userName }, { userEmail }],
  });
  if (existingUser) {
    throw new BadRequestException('Username or email already in use');
  }

  // Check if group exists
  const group = await this.groupRepo.findOne({ where: { id: groupId }, relations: ['permissions'] });
  
  if (!group) {
    throw new BadRequestException('Group not found');
  }


  // Create user entity
  const user = this.createuserRepo.create({
    userName,
    userEmail,
    password: hashedPassword,
    confirmPassword,
    fullName,
    contact,
    employee,
    department,
    location,
    group, 
  });

  // Save to database
const createdUser = await this.createuserRepo.save(user);

return await this.createuserRepo.findOne({
  where: { id: createdUser.id },
  relations: ['group', 'group.permissions'],
});

}



  //Findall Users
findAll(): Promise<CreateUser[]> {
        return this.createuserRepo.find({
           relations: ['group', 'group.permissions'],
        });
    }

    //FindOne User
    async findOne(id: number): Promise<CreateUser | null> {
      console.log('Fetching customer with id:', id);
      const user = await this.createuserRepo.findOneBy({ id });
      if (!user) {
    throw new NotFoundException('User not found');
  }
  const group = await this.groupRepo.findOne({
    where: { id: user.group.id },
    relations: ['permissions'],
  });
   user.group = {
    ...user.group,
    permissions: group?.permissions || [],
  };
      console.log('Result:', user);
      return user;
    }

    async delete(id: number): Promise<{message:string}> {
      const result = await this.createuserRepo.delete(id);
      if (!result) {
        throw new Error(`User with ID  ${id} not found`);
      } 
        return { message: `User with ID ${id} deleted successfully.` };
    }
    

  async update(id: number, updateUserDto: CreateUserdto): Promise<CreateUser> {
  const user = await this.createuserRepo.findOneBy({ id });
  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }

  if (updateUserDto.password) {
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
  }

  Object.assign(user, updateUserDto);
  return this.createuserRepo.save(user);
}

//  async find(search?: string): Promise<CreateUser[]>{
//     const query = this.createuserRepo.createQueryBuilder('module');
//     if (search) {
//       query.where(
//         'module.userName LIKE :search OR module.userEmail LIKE :search OR module.location LIKE :search OR module.fullName LIKE :search OR module.contact LIKE :search OR module.department LIKE :search OR module.employee  LIKE :search OR module.group' ,
//         { search: `%${search}%` },
//       );
//     }
//     return query.getMany();
//   }

async find(search?: string): Promise<CreateUser[]> {
  const query = this.createuserRepo.createQueryBuilder('user')
    .leftJoinAndSelect('user.group', 'group');

  if (search) {
    query.where(
      `user.userName LIKE :search
      OR user.userEmail LIKE :search
      OR user.location LIKE :search
      OR user.fullName LIKE :search
      OR user.contact LIKE :search
      OR user.department LIKE :search
      OR user.employee LIKE :search
      OR group.groupName LIKE :search`,
      { search: `%${search}%` },
    );
  }

  return query.getMany();
}


async finds(filters: { userName?: string; fullName?: string ,email?:string, location?:string, groupName?:string,}) {
  const query = this.createuserRepo.createQueryBuilder('user').leftJoinAndSelect('user.group', 'group')
 
;

  if (filters.userName) {
    query.andWhere('user.userName LIKE :userName', { userName: `%${filters.userName}%` });
  }

  if (filters.fullName) {
    query.andWhere('user.fullName LIKE :fullName', { fullName: `%${filters.fullName}%` });
  }

   if (filters.email) {
    query.andWhere('user.userEmail LIKE :userEmail', { userEmail: `%${filters.email}%` });
  }

  if (filters.location) {
    query.andWhere('user.location LIKE :location', {location: `%${filters.location}%` });
  }

   if (filters.groupName) {
    query.andWhere('group.groupName LIKE :groupName', {groupName: `%${filters.groupName}%` });
  }

  return await query.getMany();
}
  

 
}



