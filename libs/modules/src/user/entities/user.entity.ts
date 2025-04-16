import { BaseEntity } from '@base/entities';
import { Property, SwaggerProperty } from '@common/decorators';
import { ApiHideProperty } from '@nestjs/swagger';

export abstract class UserEntity extends BaseEntity {
	@SwaggerProperty()
	@Property('Tài khoản')
	username!: string;

	@ApiHideProperty()
	password!: string;
}
