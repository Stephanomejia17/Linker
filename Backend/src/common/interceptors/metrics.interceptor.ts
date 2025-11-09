import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Histogram } from 'prom-client';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  private httpRequestDuration = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duración de las solicitudes HTTP',
    labelNames: ['method', 'route', 'statusCode'],
    buckets: [0.1, 0.5, 1, 2, 5],
  });

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const route = req.route?.path || req.url;
    const method = req.method;

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;
        const duration = (Date.now() - start) / 1000;
        this.httpRequestDuration.observe(
          { method, route, statusCode },
          duration,
        );
      }),
    );
  }
}
