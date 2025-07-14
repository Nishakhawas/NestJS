import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity'; // adjust the path and entity name

// import * as dotenv from 'dotenv';
// dotenv.config(); // Load environment variables from .env file
import { ConfigModule } from '@nestjs/config';
import {  AuthModule} from './UserLogin/auth.module';
import { UserModule } from './UserRegister/user.module';
// import { RoleModule } from './RolePermission/rolepermission.module';
import { PermissionModule } from './Permission/permission.module';
import { CreateRoleModule } from './Role/createrole.module';
import { managemodule } from './ManageModule/managamodeule.module';
import {group} from './Group/group.module';
import { CreateUserController } from './CreateUser/createuser.module';
import { GroupPermissionModule } from './GroupPermission/grouppermission.module';


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
    TypeOrmModule.forFeature([User]), // add your entity classes here, 
    AuthModule,UserModule,PermissionModule,CreateRoleModule,managemodule,group,CreateUserController,
    GroupPermissionModule

  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
