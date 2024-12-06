import { ENUM_RABBITMQ_CLIENT } from '@lib/core/rabbitmq/rabbitmq.enum';
import { Inject } from '@nestjs/common';

export function InjectClientRMQ(name: ENUM_RABBITMQ_CLIENT): ParameterDecorator {
	return function (
		// eslint-disable-next-line @typescript-eslint/ban-types
		target: Function,
		propertyKey: string | symbol | undefined,
		parameterIndex: number
	) {
		Inject(name)(target, propertyKey, parameterIndex);
	};
}
