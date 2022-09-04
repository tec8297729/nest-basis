import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from '@/services/app.service';

@Controller('table')
export class TableController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post()
  async postHello(): Promise<string> {
    return this.appService.getHello();
  }
}
