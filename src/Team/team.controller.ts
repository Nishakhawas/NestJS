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
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/team.dto';
import { Team } from './team.entity';


@Controller('banners')
export class BannerController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() dto: CreateTeamDto): Promise<Team> {
    return await this.teamService.createTeam(dto);
  }

  @Get()
  async findAll(): Promise<Team[]> {
    return await this.teamService.getAllTeam();
  }

//   @Get('search')
// async find(@Query('search') search: string) {
//   return this.teamService.find(search);
// }

  // @Get('columnquery')
  // finds(@Query('bannerHeading') bannerHeading: string, @Query('startDate') startDate:Date ,@Query('endDate') endDate: Date ) {
  //   return this.teamService.finds({ bannerHeading, startDate ,endDate});
  // }

//   @Get('columnquery')
// finds(
//   @Query('bannerHeading') bannerHeading: string,
//   @Query('startDate') startDate: string,
//   @Query('endDate') endDate: string,
// ) {
//   return this.teamService.finds({
//     bannerHeading,
//     startDate: startDate ? new Date(startDate) : undefined,
//     endDate: endDate ? new Date(endDate) : undefined,
//   });
// }

  
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    return await this.teamService.getTeamById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateTeamDto,
  ): Promise<Team> {
    return await this.teamService.updateTeam(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.teamService.deleteTeam(id);
  }
}
