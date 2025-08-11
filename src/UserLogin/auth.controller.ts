import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/user-login.dto";
import { User } from "src/Entity/user.entity";
import { CreateUser } from "src/Entity/createuser.entity";
import { CustomRequest } from "src/common/types/custom-request.interface";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginUserDto , @Req() req: CustomRequest): Promise<{ token: string; }> {
    return this.authService.login(loginDto, req);
  }

  @Get()
    findAll(): Promise<CreateUser[]> {
      return this.authService.findAll();
    }
}
