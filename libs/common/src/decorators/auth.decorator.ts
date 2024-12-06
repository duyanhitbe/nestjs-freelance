import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
	AuthenticationGuard,
	AuthorizationGuard,
	PUBLIC_METADATA_KEY,
	TOKEN_ROLE_METADATA_KEY
} from '@lib/core/guards';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';

export type UseAuthOptions = {
	isPublic?: boolean;
	roles?: ENUM_TOKEN_ROLE[];
};

export function UseAuth(options?: UseAuthOptions) {
	return applyDecorators(
		ApiBearerAuth(),
		SetMetadata(PUBLIC_METADATA_KEY, options?.isPublic),
		SetMetadata(TOKEN_ROLE_METADATA_KEY, options?.roles),
		UseGuards(AuthenticationGuard, AuthorizationGuard)
	);
}
