import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EmailConfigService } from './emailconfig.service';
import { EmailConfig } from './email.entity';
import { EmailConfigDto } from './dto/emailconfig.dto';

@Controller('email-config')
export class EmailConfigController {
  constructor(private readonly emailConfigService: EmailConfigService) {}

  // GET /email-config
  @Get()
  async getActiveConfig(): Promise<EmailConfig> {
    return await this.emailConfigService.getConfig();
  }

  // PUT /email-config/:id
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateConfig(
    @Param('id') id: string,
    @Body() dto: EmailConfigDto,
  ): Promise<EmailConfig> {
    return await this.emailConfigService.updateConfig(+id, dto);
  }

  // POST /email-config
  @Post()
  async createConfig(
    @Body() dto: EmailConfigDto,
  ): Promise<EmailConfig> {
    return await this.emailConfigService.createConfig(dto);
  }

}
