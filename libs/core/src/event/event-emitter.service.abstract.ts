import { Logger } from '@nestjs/common';

export abstract class EventEmitterService {
	protected readonly logger = new Logger(this.constructor.name);

	abstract emit(pattern: string, data?: any): boolean;
}
