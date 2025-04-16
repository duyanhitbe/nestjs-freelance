import { Logger } from '@nestjs/common';

export abstract class ExecuteHandler<T = any> {
	protected readonly logger = new Logger(this.constructor.name);

	abstract execute(...args: any[]): T | Promise<T>;
}

export abstract class QueryHandler<T = any> {
	protected readonly logger = new Logger(this.constructor.name);

	abstract query(...args: any[]): T | Promise<T>;
}
