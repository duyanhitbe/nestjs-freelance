import { isEmptyObject } from '@common/helpers';
import { Logger } from '@nestjs/common';
import { Request } from 'express';

export function loggingIncomingRequest(request: Request, logger: Logger) {
	const path = request.path;
	const method = request.method;
	const ip = request.headers['x-forwarded-for'] || request.ip;
	const query = request.query;
	const body = request.body;
	const params = request.params;
	const authorization = request.headers.authorization;

	console.log();
	logger.log(`[${method}] ${path} | ${ip}`, 'Incoming Request');
	if (!isEmptyObject(query)) {
		logger.log(`[Query] ${JSON.stringify(query)}`, 'Incoming Request');
	}
	if (!isEmptyObject(body)) {
		logger.log(`[Body] ${JSON.stringify(body)}`, 'Incoming Request');
	}
	if (!isEmptyObject(params)) {
		logger.log(`[Params] ${JSON.stringify(params)}`, 'Incoming Request');
	}
	if (authorization) {
		logger.log(`[Authorization] ${authorization}`, 'Incoming Request');
	}
}
