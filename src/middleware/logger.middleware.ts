import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { logFatal } from '../utils/log4js';
import { isDevMode } from '../app.environment';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    try {
      next();
    } catch (err) {
      logFatal(req, res, err);
      console.log(process.env.NODE_ENV);
      if (isDevMode) console.log('midd层>>', err);
      res.status(err.status || 500);
    }
  }
}
