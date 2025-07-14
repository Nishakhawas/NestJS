import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/user-login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/Entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/Entity/role.entity';

@Injectable()
export class AuthService {
  constructor(
     @InjectRepository(User)
    private userRepo: Repository<User>,
       @InjectRepository(Role)
    private groupRepo: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto) {
  const { email, password } = loginDto;

  const user = await this.userRepo.findOne({
    where: { email:email },
    relations: ['role','role.permissions'], // Ensure to load the role and its permissions
  });

  if (!user) throw new UnauthorizedException('Email  found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new UnauthorizedException('Invalid password');

  
  const payload = {
    subject: user.id,
    email: user.email,
    role: user.role.name,
    permissions: user.role.users.map((p) => p.name), 
  };

  const token = this.jwtService.sign(payload);

  return {
    message: 'Login successful',
    token: token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role.name,
      permissions: user.role.users.map((p) => p.name),
    },
  };
}

  // Method to find all users
findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

}



// async login(loginDto: LoginUserDto) {
  //   const { email, password } = loginDto;
  //   const user = await this.userRepo.findOne({ where: { email } });
  //   if (!user) throw new UnauthorizedException('Email not found');

  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) throw new UnauthorizedException('Invalid password');

  //   const payload = { sub: user.id, email: user.email,role: user.role.name };
  //   const token = this.jwtService.sign(payload);

  //   return {
  //     message: 'Login successful',
  //     token: token,
  //   };
  // }

  