import { SwaggerProperty } from '@lib/common/decorators';

export abstract class LoginUserEntity {
	@SwaggerProperty()
	accessToken!: string;

	@SwaggerProperty()
	expiresIn!: number;
}
