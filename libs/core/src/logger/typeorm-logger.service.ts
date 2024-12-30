import { Logger, QueryRunner } from 'typeorm';
import { LoggerService } from './logger.service';

export class TypeOrmLogger implements Logger {
	private readonly logger = new LoggerService(TypeOrmLogger.name);

	get isDebug(): boolean {
		return process.env.IS_DEBUG_TYPEORM === 'true';
	}

	private buildMessage(query: string, parameters: any[] = [], time?: number) {
		if (!this.isDebug) return;

		let message = `Query: ${query}`;
		if (parameters.length) {
			message += `, Parameters: [${parameters}]`;
		}
		if (time || time === 0) {
			message += `, Time: ${time}ms`;
		}
		return message;
	}

	logQuery(query: string, parameters: any[] = [], queryRunner?: QueryRunner) {
		if (!this.isDebug) return;

		this.logger.verbose(this.buildMessage(query, parameters));
	}

	logQueryError(
		error: string | Error,
		query: string,
		parameters?: any[],
		queryRunner?: QueryRunner
	) {
		this.logger.error(error);
		this.logger.error(this.buildMessage(query, parameters));
	}

	logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
		this.logger.warn(this.buildMessage(query, parameters, time));
	}

	logSchemaBuild(message: string, queryRunner?: QueryRunner) {
		if (!this.isDebug) return;

		this.log('info', message, queryRunner);
	}

	logMigration(message: string, queryRunner?: QueryRunner) {
		if (!this.isDebug) return;

		this.log('info', message, queryRunner);
	}

	log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
		if (!this.isDebug) return;

		switch (level) {
			case 'log':
				this.logger.log(message);
				break;
			case 'info':
				this.logger.verbose(message);
				break;
			case 'warn':
				this.logger.warn(message);
				break;
		}
	}
}
