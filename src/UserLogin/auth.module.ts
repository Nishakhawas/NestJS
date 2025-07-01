// auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from '../Entity/user.entity'; // adjust path as needed
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { Role } from 'src/Entity/role.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role]),  // <-- THIS LINE IS CRUCIAL
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret', // make sure to use .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController], // Add your controllers here if needed
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
