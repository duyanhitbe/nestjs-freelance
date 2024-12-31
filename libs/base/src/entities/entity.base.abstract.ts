import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';

export abstract class BaseEntity {
	@ApiProperty()
	id!: string;

	@ApiProperty()
	createdAt!: Date;

	@ApiProperty()
	updatedAt!: Date;

	@ApiHideProperty()
	deletedAt?: Date;

	@ApiProperty({
		enum: ENUM_STATUS,
		enumName: 'ENUM_STATUS'
	})
	status!: ENUM_STATUS;
}
