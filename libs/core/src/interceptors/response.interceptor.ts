import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request, Response } from 'express';
import { IListResponse, IResponse } from '@lib/common/interfaces';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	private readonly logger = new Logger(this.constructor.name);

	intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse | IListResponse> {
		const response = context.switchToHttp().getResponse<Response>();
		const request = context.switchToHttp().getRequest<Request>();
		const statusCode = response.statusCode;
		const start = performance.now();

		const path = request.path;
		const method = request.method;

		return next.handle().pipe(
			map((data) => {
				if (path === '/') return data;

				const end = performance.now();
				const message = 'success';
				const success = true;
				const duration = `${(end - start).toFixed(0)}ms`;

				this.logger.log(`[${method}] ${path} | ${duration}`, 'Incoming Request');
				if (process.env.IS_DEBUG_HTTP_RESPONSE === 'true') {
					this.logger.debug(data, 'Incoming Request');
				}

				if (data.data && data.meta) {
					return {
						statusCode,
						message,
						success,
						duration,
						path,
						data: data.data,
						meta: data.meta
					};
				}

				return {
					statusCode,
					message,
					success,
					duration,
					path,
					data
				};
			})
		);
	}
}
