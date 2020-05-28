import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { logFatal } from '../logger/log4js';
import { isDevEnv } from 'src/utils/isEnv';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    try {
      next();
    } catch (err) {
      logFatal(req, res, err);
      console.log(process.env.NODE_ENV);
      if (isDevEnv()) console.log('midd层>>', err);
      res.status(err.status || 500);
    }
  }
}
