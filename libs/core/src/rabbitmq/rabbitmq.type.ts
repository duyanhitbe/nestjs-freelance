import { ENUM_QUEUE, ENUM_RABBITMQ_CLIENT } from './rabbitmq.enum';
import { RABBITMQ_PATTERNS } from './rabbitmq.constant';
import { Observable } from 'rxjs';

export type RabbitMQModuleOptions = {
	name: ENUM_RABBITMQ_CLIENT;
	queue: ENUM_QUEUE;
};

export type RabbitMQPattern = (typeof RABBITMQ_PATTERNS)[keyof typeof RABBITMQ_PATTERNS];

export type RMQClientProxy = {
	send<TResult = any, TInput = any>(pattern: RabbitMQPattern, data: TInput): Observable<TResult>;
	emit<TResult = any, TInput = any>(pattern: RabbitMQPattern, data: TInput): Observable<TResult>;
};
