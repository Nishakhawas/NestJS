import { CustomRequest } from './../common/types/custom-request.interface';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/team.dto';
import { TeamService } from './team.service';
import { Team } from './team.entity';
import { JwtAuthGuard } from 'src/UserLogin/jwt-auth.guard';




@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateTeamDto,@Req() req: CustomRequest): Promise<Team> {
  const userId = req.user.id;    // This is the decoded user ID from JWT
  console.log('User ID:', userId);
    return await this.teamService.createTeam(dto,req);
  }

  @Get()
  async findAll(): Promise<Team[]> {
    return await this.teamService.getAllTeam();
  }

  @Get('search')
async find(@Query('search') search: string) {
  return this.teamService.find(search);
}

  @Get('columnquery')
  finds(@Query('name') name: string, @Query('designation') designation: string ,@Query('phone') phone: string,@Query('email') email: string ) {
    return this.teamService.finds({ name, designation ,phone,email});
  }

  
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    return await this.teamService.getTeamById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateTeamDto,@Req() req: CustomRequest
  ): Promise<Team> {
    return await this.teamService.updateTeam(id, dto, req);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.teamService.deleteTeam(id);
  }
}
