import { Inject } from '@nestjs/common';
import { REDIS_METADATA } from './redis.constant';

export function InjectRedis(): ParameterDecorator {
	return function (
		// eslint-disable-next-line @typescript-eslint/ban-types
		target: Function,
		propertyKey: string | symbol | undefined,
		parameterIndex: number
	) {
		Inject(REDIS_METADATA)(target, propertyKey, parameterIndex);
	};
}
