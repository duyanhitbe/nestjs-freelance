import { Logger } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

export class RabbitMQConsumer {
	private readonly logger = new Logger(this.constructor.name);

	subscribe(pattern: any) {
		this.logger.log(`Subscribe to event with pattern: ${JSON.stringify(pattern)}`);
	}

	ack(pattern: any, context: RmqContext) {
		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();
		channel.ack(originalMessage);
		this.logger.log(`Ack message with pattern: ${JSON.stringify(pattern)} successfully`);
	}
}
