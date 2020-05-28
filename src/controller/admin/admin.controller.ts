import { Controller, Get } from '@nestjs/common';
import { LoginRes } from './dto/login';

@Controller('admin')
export class AdminController {
  @Get('/login')
  async login(): Promise<LoginRes> {
    return {
      name: 'hello home',
      phone: 133333333,
      age: 66,
    };
  }
}
