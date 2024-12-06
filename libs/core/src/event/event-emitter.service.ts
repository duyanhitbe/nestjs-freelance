import { Injectable } from '@nestjs/common';
import { EventEmitterService } from '@lib/core/event/event-emitter.service.abstract';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventEmitterServiceImp extends EventEmitterService {
	constructor(private readonly eventEmitter: EventEmitter2) {
		super();
	}

	emit(pattern: string, data?: any): boolean {
		this.logger.log(`Publish event "${pattern}"`);
		this.logger.debug(data);
		return this.eventEmitter.emit(pattern, data);
	}
}
