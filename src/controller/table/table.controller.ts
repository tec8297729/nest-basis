import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from 'src/services/app.service';

@Controller('')
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
