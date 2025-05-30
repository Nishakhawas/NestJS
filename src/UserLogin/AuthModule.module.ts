// auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './AuthService.service';
import { User } from '../Entity/user.entity'; // adjust path as needed
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './AuthController.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // <-- THIS LINE IS CRUCIAL
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret', // make sure to use .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController], // Add your controllers here if needed
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
