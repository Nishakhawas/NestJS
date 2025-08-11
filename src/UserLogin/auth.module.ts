// auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { Group } from 'src/Entity/group.entity';
import { CreateUser } from 'src/Entity/createuser.entity';
import { JwtStrategy } from './jwt.strategy';
import { LoginActivity } from 'src/Helper Function/Login Function/login.entity';
import { DateService } from 'src/Helper Function/Date/date.service';
import { Nepequengdate } from 'src/Helper Function/Date/nepequengdate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreateUser,Group,LoginActivity,Nepequengdate]),  // <-- THIS LINE IS CRUCIAL
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret', // make sure to use .env
      // signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController], // Add your controllers here if needed
  providers: [AuthService,DateService,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
