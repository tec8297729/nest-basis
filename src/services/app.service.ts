import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    await setTimeout(() => {
      return;
    }, 3000);
    return 'Hello World!222';
  }
}
