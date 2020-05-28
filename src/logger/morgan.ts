import * as morgan from 'morgan';
import { logInfo } from './log4js';
const getLogger = () => {
  // correct request ip
  morgan.token('remote-addr', function(req) {
    return req.clientIp;
  });

  const morganUseOpt = morgan(
    (tokens, req, res) => {
      const logData = [
        req.clientIp,
        '- - -',
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        JSON.stringify(req.body),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res), // 响应时间
        'ms -',
        req.headers.referer,
        req.headers['user-agent'],
      ].join(' ');

      logInfo(logData);
      return logData;
    },
    {
      skip: function(req, res) {
        return res.statusCode > 400; // false为记录
      },
    },
  );

  // if (process.env.NODE_ENV === 'development') {
  //   return morgan('dev');
  // } else {
  //   return morganUseOpt;
  // }

  return morganUseOpt;
};

export default getLogger;
