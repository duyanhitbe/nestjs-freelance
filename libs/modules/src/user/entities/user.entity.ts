import { BaseEntity } from '@lib/base/entities';
import { ApiHideProperty } from '@nestjs/swagger';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class UserEntity extends BaseEntity {
	@SwaggerProperty()
	@Property('Tài khoản')
	username!: string;

	@ApiHideProperty()
	password!: string;
}
