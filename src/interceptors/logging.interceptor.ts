import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { setRequestId } from '../request-context';

const maskedFields = ['password', 'token'];

function maskSensitive(data: any): any {
  if (typeof data !== 'object' || !data) return data;
  const cloned = { ...data };
  for (const key of maskedFields) {
    if (cloned[key]) cloned[key] = '[***]';
  }
  return cloned;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  private skipRoutes: string[] = ['/health', '/favicon.ico'];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const { method, url, body, query, params } = req;

    if (this.skipRoutes.includes(url)) {
      return next.handle();
    }

    const requestId = uuidv4();
    setRequestId(requestId);

    const start = Date.now();

    return next.handle().pipe(
      tap((responseData) => {
        const duration = Date.now() - start;
        const log = {
          requestId,
          method,
          url,
          statusCode: res.statusCode,
          duration: `${duration}ms`,
          query,
          params,
          body: maskSensitive(body),
          response: maskSensitive(responseData),
        };

        this.logger.log(`${method} ${url} - ${res.statusCode} (${duration}ms)`, requestId);
        this.logger.debug(JSON.stringify(log));
      }),
    );
  }
}
