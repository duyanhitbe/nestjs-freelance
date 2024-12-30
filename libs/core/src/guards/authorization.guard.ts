import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';
import { I18nExceptionService } from '@lib/core/i18n';
import { Reflector } from '@nestjs/core';
import { PUBLIC_METADATA_KEY } from '@lib/core/guards/authentication.guard';
import { RequestUser } from '@lib/common/interfaces';

export const TOKEN_ROLE_METADATA_KEY = 'TOKEN_ROLE_METADATA_KEY';

@Injectable()
export class AuthorizationGuard implements CanActivate {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		private readonly i18nExceptionService: I18nExceptionService,
		private readonly reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = request.user as RequestUser;

		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_METADATA_KEY, [
			context.getClass(),
			context.getHandler()
		]);
		if (isPublic) return true;

		const roles = this.reflector.getAllAndOverride<ENUM_TOKEN_ROLE[]>(TOKEN_ROLE_METADATA_KEY, [
			context.getClass(),
			context.getHandler()
		]);
		if (!roles || !roles.length) return true;

		if (!roles.includes(user!.role)) {
			this.logger.error('Invalid role');
			this.logger.debug(`Required roles: ${roles}`);
			this.logger.debug(`User role: ${user!.role}`);
			this.i18nExceptionService.throwInvalidAuthorization();
		}
		return true;
	}
}
