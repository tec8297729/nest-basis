import * as log4js from 'log4js'; // 打印错误日志
import { Request, Response } from 'express';

// 配置log4js文件
log4js.configure({
  // 输出源--type:文件(你也可定义xml),filename:输出的文件名
  appenders: {
    out: { type: 'console' }, // 控制台输出
    debug: {
      type: 'datefile',
      filename: './logs/debug_logs/deb',
      pattern: '-yyyy-MM-dd.log', // 表示一个文件的时间命名格式，只有配合datefile才起作用
      alwaysIncludePattern: true, // 表示日志是否包含命名格式，只有配合datefile才起作用, 默认值'.yyyy-MM-dd'
      // 'maxLogSize': 2097152, // 只在 type: 'file' 中才支持
      backup: 10, // 当文件内容超过文件存储空间时，备份文件的数量（超过10个会删除前面）
      // numBackups: 7, // 可保持几个备份文件
      daysToKeep: 10, // 时间文件 保存多少天，以前的log将被删除
      encoding: 'utf-8', // default "utf-8"，文件的编码
      // compress : true, // 是否以压缩的形式保存新文件,默认false
    },
    // err日志
    err: {
      type: 'dateFile',
      filename: 'logs/error_logs/err',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
    },
    // info日志
    info: {
      type: 'dateFile',
      filename: 'logs/info_logs/info',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
    },
    // fatal日志
    fatal: {
      type: 'dateFile',
      filename: 'logs/fatal_logs/ftl',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
    },
  },
  // appenders每个单独源定义一个名称,level:报错标题-可以定义多个
  categories: {
    debug: { appenders: ['debug'], level: 'debug' },
    default: { appenders: ['err'], level: 'error' },
    info: { appenders: ['info'], level: 'info' },
    fatal: { appenders: ['fatal'], level: 'fatal' },
  },
});

const loggerErr = log4js.getLogger('err');
const loggerInfo = log4js.getLogger('info');
const loggerFatal = log4js.getLogger('fatal');

const _handleLogData = (req: Request, res: Response, error: string): string => {
  return [
    req.clientIp,
    '- - -',
    req.method,
    req.originalUrl || req.url,
    String(res.statusCode),
    JSON.stringify(req.body),
    '-',
    req.headers.referer,
    req.headers['user-agent'],
    '- -',
    error,
  ].join(' ');
};

/**
 * 日志error级别
 */
const logError = (req: Request, res: Response, error: string) => {
  loggerErr.error(_handleLogData(req, res, error));
};

/**
 * 日志fatal级别
 */
const logFatal = (req: Request, res: Response, error: string) => {
  loggerFatal.fatal(_handleLogData(req, res, error));
};

/**
 * 日志info常规级别
 */
const logInfo = (data: string) => {
  loggerInfo.error(data);
};

// 以下是报错信息内容,不同类型区分
// logger.trace('跟踪信息');
// logger.debug('调试信息');
// logger.info('输出信息');
// logger.warn('警告信息');
// logger.error('错误信息');
// logger.fatal('致命信息');

export { logError, logInfo, logFatal };
