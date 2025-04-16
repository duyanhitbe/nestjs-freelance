import { ENUM_TOKEN_ROLE } from '@core/jwt';

export type RequestUser = {
	id: string;
	username?: string;
	role: ENUM_TOKEN_ROLE;
} | null;
