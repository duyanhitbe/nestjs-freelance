import { SwaggerProperty } from '@common/decorators';

export abstract class LoginUserEntity {
	@SwaggerProperty()
	accessToken!: string;

	@SwaggerProperty()
	expiresIn!: number;
}
