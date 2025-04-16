import { ENUM_RABBITMQ_CLIENT } from '@core/rabbitmq/rabbitmq.enum';
import { applyDecorators, Controller, Inject } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

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

export function Consumer() {
	return applyDecorators(Controller(), ApiExcludeController());
}
