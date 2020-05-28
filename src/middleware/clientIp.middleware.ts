import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import requestIp = require('request-ip');
import randomIp = require('random-ip');

// 获取用户IP
@Injectable()
export class ClientIpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    let ip = requestIp.getClientIp(req);
    if (ip === '::1') {
      // local test, do mock
      ip = randomIp('218.1.33.190', 16, 24);
    } else if (/^::ffff:/.test(ip)) {
      // only support ipv4 now
      ip = ip.replace(/^::ffff:/, '');
    }

    // 挂载用户ip在req.clientIp属性上
    req = Object.defineProperty(req, 'clientIp', {
      get: () => ip,
      configurable: true,
    });
    next();
  }
}
