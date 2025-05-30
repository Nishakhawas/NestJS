import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entity/user.entity'; // adjust the path to your entity
import { CreateUserDto } from './dto/create-user.dto'; // ← HERE
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

 async create(createUserDto: CreateUserDto): Promise<User> {
  const{ name, email, password } = createUserDto;

  //Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
    const user = this.userRepo.create({
    name,
    email,
    password: hashedPassword, // Use the hashed password
    });

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


    async delete(id: number): Promise<void> {
      const result = await this.userRepo.delete(id);
      if (result.affected === 0) {
        throw new Error(`User with ID ${id} not found`);
      } 
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


