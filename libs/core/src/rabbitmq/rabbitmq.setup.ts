import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '@lib/common/interfaces';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ENUM_QUEUE } from './rabbitmq.enum';

export function connectRabbitMQ(
	app: INestApplication,
	configService: ConfigService<Env>,
	queues: ENUM_QUEUE[]
) {
	queues.forEach((queue) => {
		app.connectMicroservice<MicroserviceOptions>({
			transport: Transport.RMQ,
			options: {
				urls: [configService.get('RABBIT_MQ_URL') as string],
				queue,
				noAck: false,
				prefetchCount: 1,
				queueOptions: {
					durable: true
				}
			}
		});
	});
}
