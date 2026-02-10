import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nepequengdate } from './nepequengdate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DateService {
  constructor(
    @InjectRepository(Nepequengdate)
    public dateRepo: Repository<Nepequengdate>,
  ) {}

  async getBsDateFromAdDate(adDate: string): Promise<string | null> {
    const result = await this.dateRepo.findOne({
      where: { addate: adDate },
    });

    return result?.bsdate || null;
  }
}