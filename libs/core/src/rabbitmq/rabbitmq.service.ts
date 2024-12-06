import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service.abstract';
import { RabbitMQPattern } from './rabbitmq.type';

@Injectable()
export class RabbitmqServiceImp extends RabbitmqService {
	constructor(private readonly clientProxy: ClientProxy) {
		super();
	}

	emit(pattern: RabbitMQPattern, data: any) {
		this.logger.log(`Publish message ${JSON.stringify(pattern)}`);
		this.logger.debug(data);
		return this.clientProxy.emit(pattern, data);
	}

	send(pattern: RabbitMQPattern, data: any) {
		this.logger.log(`Sending message ${JSON.stringify(pattern)}`);
		this.logger.debug(data);
		return this.clientProxy.send(pattern, data);
	}
}
