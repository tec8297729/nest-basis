import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logError } from 'src/logger/log4js';

// 捕获寻找http异常(指定的类型)
@Catch(HttpException)
export class GlobalErrorFilterMiddleware implements ExceptionFilter {
  // 异常过滤器,exception必须指定捕获的异常类型
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    response.statusCode = status;
    logError(request, response, ''); // 日志

    // 当捕获到错误进入此处理环境, 拦截返回指定响应数据等.
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      // message: '容错层',
    });
  }
}
