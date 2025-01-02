import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { loggingIncomingRequest } from '../logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private readonly logger = new Logger(this.constructor.name);

	use(req: Request, res: Response, next: NextFunction) {
		loggingIncomingRequest(req, this.logger);
		next();
	}
}
