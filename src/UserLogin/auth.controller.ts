import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/user-login.dto";
import { User } from "src/Entity/user.entity";
import { CreateUser } from "src/Entity/createuser.entity";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Get()
    findAll(): Promise<CreateUser[]> {
      return this.authService.findAll();
    }
}
