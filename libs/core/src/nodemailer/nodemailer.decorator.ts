import { Inject } from '@nestjs/common';
import { NODEMAILER_TRANSPORT } from './nodemailer.constant';

export function InjectNodemailer(): ParameterDecorator {
	return function (
		// eslint-disable-next-line @typescript-eslint/ban-types
		target: Function,
		propertyKey: string | symbol | undefined,
		parameterIndex: number
	) {
		Inject(NODEMAILER_TRANSPORT)(target, propertyKey, parameterIndex);
	};
}
