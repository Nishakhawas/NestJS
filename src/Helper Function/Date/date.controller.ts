
import { Controller, Get, Query } from '@nestjs/common';
import { DateService } from './date.service';

@Controller('date')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Get('convert-ad-to-bs')
  async convertAdToBs(@Query('adDate') adDate: string) {
    const bsDate = await this.dateService.getBsDateFromAdDate(adDate);
    console.log("🚀 ~ DateController ~ convertAdToBs ~ bsDate:", bsDate)

    if (!bsDate) {
      return { message: 'BS date not found for the given AD date', adDate };
    }

    return { adDate, bsDate };
  }
}
