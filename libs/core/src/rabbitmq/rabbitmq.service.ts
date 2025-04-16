import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RabbitMQPattern } from './rabbitmq.type';

@Injectable()
export abstract class RabbitmqService {
	abstract emit(pattern: RabbitMQPattern, data: any): Observable<any>;

	abstract send(pattern: RabbitMQPattern, data: any): Observable<any>;
}
