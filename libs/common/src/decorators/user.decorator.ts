import { createParamDecorator, ExecutionContext, Query } from '@nestjs/common';
import { RequestUserPipe } from '../pipes';

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	const user = request.user;
	return data ? user?.[data] : user;
});

export function QueryWithUser(): ParameterDecorator {
	return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
		Query(RequestUserPipe)(target, propertyKey, parameterIndex);
	};
}
