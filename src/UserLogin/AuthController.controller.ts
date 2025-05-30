import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./AuthService.service";
import { LoginUserDto } from "./dto/user-login.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }
}
