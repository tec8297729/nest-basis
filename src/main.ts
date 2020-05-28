import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getLogger from './logger/morgan';
import { GlobalErrorFilterMiddleware } from './middleware/GlobalErrorFilter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(getLogger());
  app.useGlobalFilters(new GlobalErrorFilterMiddleware());
  await app.listen(3000);
}
bootstrap();
