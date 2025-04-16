import { EventEmitterService } from '@core/event/event-emitter.service';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventEmitterServiceImp extends EventEmitterService {
	private readonly logger = new Logger(this.constructor.name);

	constructor(private readonly eventEmitter: EventEmitter2) {
		super();
	}

	emit(pattern: string, data?: any): boolean {
		this.logger.log(`Publish event "${pattern}"`);
		this.logger.debug(data);
		return this.eventEmitter.emit(pattern, data);
	}
}
