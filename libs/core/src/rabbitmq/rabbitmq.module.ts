import { DynamicModule, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Env } from '@lib/common/interfaces';
import { RabbitMQModuleOptions } from '@lib/core/rabbitmq/rabbitmq.type';
import { RabbitmqServiceImp } from '@lib/core/rabbitmq/rabbitmq-imp.service';

@Module({})
export class RabbitMQModule {
	static register(options: RabbitMQModuleOptions[]): DynamicModule {
		const exports = options.map((option) => option.name);
		return {
			module: RabbitMQModule,
			global: true,
			providers: options.map(({ name, queue }) => ({
				provide: name,
				inject: [ConfigService],
				useFactory: (configService: ConfigService<Env>) => {
					const clientProxy = ClientProxyFactory.create({
						transport: Transport.RMQ,
						options: {
							urls: [configService.get('RABBIT_MQ_URL') as string],
							queue,
							queueOptions: {
								durable: true
							}
						}
					});
					return new RabbitmqServiceImp(clientProxy) as any;
				}
			})),
			exports
		};
	}
}
