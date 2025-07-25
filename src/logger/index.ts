import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import 'winston-daily-rotate-file';

const dailyRotateTransport = new winston.transports.DailyRotateFile({
  dirname: 'logs',
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d', // keep logs for 14 days
  level: 'info',
});

const errorRotateTransport = new winston.transports.DailyRotateFile({
  dirname: 'logs',
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '30d',
  level: 'error',
});

export const winstonLoggerOptions: winston.LoggerOptions = {
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike('App', {
            prettyPrint: true,
          }),
          winston.format.printf(({ timestamp, level, message }) => {
            // Custom format: [application] number date time level message
            return `[USER-MANAGEMENT-APP] ${process.pid} ${timestamp} ${level} ${message}`
          }),
        ), 
    }),
    dailyRotateTransport,
    errorRotateTransport,
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'info',
    }),
  ],
};
