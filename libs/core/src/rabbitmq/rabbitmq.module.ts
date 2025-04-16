import { Env } from '@common/interfaces';
import { RabbitmqServiceImp } from '@core/rabbitmq/rabbitmq-imp.service';
import { RabbitMQModuleOptions } from '@core/rabbitmq/rabbitmq.type';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

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
