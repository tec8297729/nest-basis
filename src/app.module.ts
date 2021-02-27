import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './services/app.service';
import { TableController } from './controller/table/table.controller';
import { AdminController } from './controller/admin/admin.controller';
import { LoggerMiddleware, ClientIpMiddleware } from './middleware';

@Module({
  imports: [],
  controllers: [TableController, AdminController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ClientIpMiddleware).forRoutes('*'); // userIp
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 日志中间层
  }
}
