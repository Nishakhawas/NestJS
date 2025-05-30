import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity'; // adjust the path and entity name
import { UserController } from './User/user.controller';
import { UserService } from './User/user.service';
import { Customer } from './Entity/customer.entity';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
// import * as dotenv from 'dotenv';
// dotenv.config(); // Load environment variables from .env file
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './UserLogin/AuthModule.module';


@Module({
  
  imports:[
    ConfigModule.forRoot({ isGlobal: true }),
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST, // usually 'localhost' or your DB server IP
     port: +(process.env.DB_PORT || 3306),   // default MySQL port is 3306
      username: process.env.DB_USERNAME,  // default is usually "postgres"
      password: process.env.DB_PASSWORD,     // the one you set during installation
      database:process.env.DB_DATABASE, // the name you created in database
      // entities: [User],    // add your entity classes here
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // this is key             
      synchronize: true,      // auto-create tables (disable in prod!)
    }),
    TypeOrmModule.forFeature([User,Customer]), // add your entity classes here, 
    AuthModule
    
  ],
  
  controllers: [AppController,UserController,CustomerController],
  providers: [AppService,UserService,CustomerService],
})
export class AppModule {}
