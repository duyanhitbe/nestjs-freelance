import { removeBracket, snakeToCamel } from '@common/helpers';
import { TranslateService } from '@core/i18n';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeormFilter implements ExceptionFilter {
	private readonly logger = new Logger(this.constructor.name);

	constructor(private readonly translateService: TranslateService) {}

	catch(exception: QueryFailedError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const code = exception['code'];
		const detail = exception['detail'];

		this.logger.error(`code = ${code} | detail = ${detail}`);

		if (code === '23505') {
			const message = detail.split(' ')[1];
			const field = removeBracket(snakeToCamel(message.split('=')[0])).toUpperCase();
			const translatedField = this.translateService.field(field);
			const error = this.translateService.existsMessage(translatedField);

			response.status(409).json({
				statusCode: 409,
				message: 'Conflict',
				errors: [error]
			});
			return;
		}

		if (code === '23503') {
			const message = detail.split(' ')[1];
			const field = removeBracket(snakeToCamel(message.split('=')[0]));

			response.status(400).json({
				statusCode: 400,
				message: 'Bad Request',
				errors: [
					{
						property: field,
						message: [`Invalid ${field}`]
					}
				]
			});
			return;
		}

		response.status(500).json({
			statusCode: 500,
			message: 'Database Error'
		});
	}
}
