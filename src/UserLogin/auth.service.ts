import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/user-login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/Entity/group.entity';
import { CreateUser } from 'src/Entity/createuser.entity';

@Injectable()
export class AuthService {
  constructor(
     @InjectRepository(CreateUser)
    private userRepo: Repository<CreateUser>,

    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto) {
  const { userEmail, password } = loginDto;

  const user = await this.userRepo.findOne({
    where: { userEmail },
    relations: ['group','group.permissions'], 
  });

  if (!user) throw new UnauthorizedException('Email  found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new UnauthorizedException('Invalid password');

  
  const payload = {
    sub: user.id,
    email: user.userEmail,
    role: user.group.groupName,
    permissions: user.group.permissions.map((p) => p.name),
  };
  console.log("🚀 ~ AuthService ~ login ~ payload:", payload)

  const token = this.jwtService.sign(payload);
  console.log("🚀 ~ AuthService ~ login ~ token:", token)

  return {
    message: 'Login successful',
    token: token,
    user: {
      id: user.id,
      email: user.userEmail,
      role: user.group.groupName,
      permissions: user.group.permissions.map((p) => p.name),
    },
  };
}

  // Method to find all users
findAll(): Promise<CreateUser[]> {
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

  