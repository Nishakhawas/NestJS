import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entity/user.entity'; // adjust the path to your entity
import { CreateUserDto } from './dto/create-user.dto'; // ← HERE
import * as bcrypt from 'bcrypt';
import { Role } from 'src/Entity/role.entity';
import { register } from 'module';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  
  // Method to create a new user
 async create(createUserDto: CreateUserDto): Promise<User> {
const{ name, email, password,roleName } = createUserDto;


  // Check if the user with the name 'admin' exists
// const User = await this.userRepo.findOne({ where: { name:'admin' } });

// if (!User) throw new UnauthorizedException('Email not found');

// if (!User.role) throw new UnauthorizedException('No role assigned to user');

// const roleName = User.role.name;

 
  //Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); //salts round
    const Role = await this.roleRepo.findOne({ where: { name: roleName } });

    let user: User;
    if(Role){
    user=  this.userRepo.create({
    name,
    email,
    password: hashedPassword, // Use the hashed password
    role: Role, 
    })}

else{
  throw new UnauthorizedException('Default role not found');
}
  try {
  return await this.userRepo.save(user);
} catch (error) {
  if (error.code === 'ER_DUP_ENTRY') {
    const sqlMsg = error.sqlMessage || '';
    if (sqlMsg.includes('email')) {
      throw new ConflictException('Email is already taken!');
    } else if (sqlMsg.includes('name')) {
      throw new ConflictException('Name is already taken!');
    } else {
      throw new ConflictException('Duplicate entry!');
    }
  }
  throw new InternalServerErrorException('Something went wrong!');
}

  }



  // Method to find all users
    findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    async findOne(id: number): Promise<User | null> {
      console.log('Fetching customer with id:', id);
      const user = await this.userRepo.findOneBy({ id });
      console.log('Result:', user);
      return user;
    }


    async delete(id: number): Promise<{message:string}> {
      const result = await this.userRepo.delete(id);
      if (!result) {
        throw new Error(`User with ID  ${id} not found`);
      } 
        return { message: `User with ID ${id} deleted successfully.` };
    }
    

    async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
      const user = await this.userRepo.findOneBy({ id });
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      Object.assign(user, updateUserDto);
      return this.userRepo.save(user);
    }
  }


