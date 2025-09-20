import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {

  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => {
      return {
        data,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data.message || 'Success',
        timestamp: new Date().toISOString(),
        apiVersion: this.configService.get('appConfig.apiVersion'),
      };
    }));
  }
}
