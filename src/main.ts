import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorFilterMiddleware } from './middleware/GlobalErrorFilter.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new GlobalErrorFilterMiddleware());
  app.enableCors(); // cors
  const staticDir = join(__dirname, '../public');
  app.useStaticAssets(staticDir); // 静态文件目录

  await app.listen(7000);
}
bootstrap();
