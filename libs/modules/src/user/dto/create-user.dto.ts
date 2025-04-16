import { I18nIsNotEmpty, I18nIsString, Property, SwaggerProperty } from '@common/decorators';

export class CreateUserDto {
	@SwaggerProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Tài khoản')
	username!: string;

	@SwaggerProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Mật khẩu')
	password!: string;
}
