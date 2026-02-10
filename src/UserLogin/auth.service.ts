import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/user-login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/Entity/group.entity';
import { CreateUser } from 'src/Entity/createuser.entity';
import { saveLoginActivity } from 'src/Helper Function/Login Function/login.helper';
import { LoginActivity } from 'src/Helper Function/Login Function/login.entity';
import { Nepequengdate } from 'src/Helper Function/Date/nepequengdate.entity';
import { DateService } from 'src/Helper Function/Date/date.service';
import { CustomRequest } from 'src/common/types/custom-request.interface';

@Injectable()
export class AuthService {
  constructor(
     @InjectRepository(CreateUser)
    private userRepo: Repository<CreateUser>,
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
    private jwtService: JwtService,
    @InjectRepository(LoginActivity)
    private readonly loginActivityRepo: Repository<LoginActivity>,
     @InjectRepository(Nepequengdate)  
        private readonly dateRepo: Repository<Nepequengdate>,
        //  private readonly dateService: DateService,

  ) {}

//   async login(loginDto: LoginUserDto) {
//   const { userEmail, password } = loginDto;

//   const user = await this.userRepo.findOne({
//     where: { userEmail },
//     relations: ['group','group.permissions'], 
//   });

//   if (!user) throw new UnauthorizedException('Email  found');
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new UnauthorizedException('Invalid password');

  
//   const payload = {
//     sub: user.id,
//     email: user.userEmail,
//     role: user.group.groupName,
//     permissions: user.group.permissions.map((p) => p.name),
//   };
//   console.log("🚀 ~ AuthService ~ login ~ payload:", payload)

//   const token = this.jwtService.sign(payload);
//   console.log("🚀 ~ AuthService ~ login ~ token:", token)



//   return {
//     message: 'Login successful',
//     token: token,
//     user: {
//       id: user.id,
//       email: user.userEmail,
//       role: user.group.groupName,
//       permissions: user.group.permissions.map((p) => p.name),
//     },
//   };


// }

  // Method to find all users

async login(loginDto: LoginUserDto , req: CustomRequest) {
  const { userEmail, password } = loginDto;

  // 1️⃣ Find the user
  const user = await this.userRepo.findOne({
    where: { userEmail },
    relations: ['group','group.permissions'], 
  });

  // Log if email not found
  if (!user) {
    await saveLoginActivity(
      this.loginActivityRepo,
      {
        loginuserid: 0, 
        loginuseremail: userEmail,
        loginip: 'unknown', 
        loginmac: '',       
        isvalidlogin: false,
        locationid: '' ,
      },
      this.dateRepo
    );
    throw new UnauthorizedException('Email not found');
  }

  //  Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    await saveLoginActivity(
      this.loginActivityRepo,
      {
        loginuserid: user.id,
        loginuseremail: user.userEmail,
        loginip: 'unknown', // or get from req.ip
        loginmac: '',
        isvalidlogin: false,
        locationid: user.location,
      },
      this.dateRepo
    );
    throw new UnauthorizedException('Invalid password');
  }

  //  Success — log valid login
  await saveLoginActivity(
    this.loginActivityRepo,
    {
      loginuserid: user.id,
      loginuseremail: user.userEmail,
      loginip: req.ip,
      loginmac: req.mac,
      isvalidlogin: true,
      locationid: user.location,
    
    },
    this.dateRepo
  );

  // 5️⃣ Prepare JWT payload
  const payload = {
    sub: user.id,
    email: user.userEmail,
    role: user.group.groupName,
    permissions: user.group.permissions.map((p) => p.name),
  };

  const token = this.jwtService.sign(payload);

  return {
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.userEmail,
      role: user.group.groupName,
      permissions: user.group.permissions.map((p) => p.name),
    },
  };
}


  findAll(): Promise<CreateUser[]> {
        return this.userRepo.find();
    }

}




  