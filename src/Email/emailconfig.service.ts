import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailConfigDto } from './dto/emailconfig.dto';
import { EmailConfig } from './email.entity';

@Injectable()
export class EmailConfigService {
  constructor(
    @InjectRepository(EmailConfig)
    private readonly emailConfigRepo: Repository<EmailConfig>,
  ) {}

  // Get the active email configuration
  async getConfig(): Promise<EmailConfig> {
    const config = await this.emailConfigRepo.findOne({
      where: { isActive: true },
    });

    if (!config) {
      throw new NotFoundException('Active email configuration not found');
    }

    return config;
  }

  // Update existing config by ID
  async updateConfig(id: number, dto: EmailConfigDto): Promise<EmailConfig> {
    const config = await this.emailConfigRepo.findOne({ where: { id } });

    if (!config) {
      throw new NotFoundException(`Email configuration with ID ${id} not found`);
    }

    const updated = this.emailConfigRepo.merge(config, dto);
    return await this.emailConfigRepo.save(updated);
  }

  // Optional: Create new config (if you allow multiple configs)
  async createConfig(dto: EmailConfigDto): Promise<EmailConfig> {
    const newConfig = this.emailConfigRepo.create(dto);
    return await this.emailConfigRepo.save(newConfig);
  }

}
