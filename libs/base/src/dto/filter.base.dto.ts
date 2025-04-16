import { BaseEntity } from '@base/entities';
import { Where } from '@base/types';
import { I18nIsEnum } from '@common/decorators/i18n.decorator';
import { Property } from '@common/decorators/property.decorator';
import { SwaggerProperty } from '@common/decorators/swagger.decorator';
import { RequestUser } from '@common/interfaces';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ENUM_STATUS } from '../enums/status.enum';

export class BaseFilterDto<T extends BaseEntity = any> {
	@IsOptional()
	@SwaggerProperty({ required: false, type: 'string' })
	@Property('Item count per page')
	limit?: string | number;

	@IsOptional()
	@SwaggerProperty({ required: false, type: 'string' })
	@Property('Page number')
	page?: string | number;

	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search')
	search?: string;

	@IsOptional()
	@I18nIsEnum(ENUM_STATUS)
	@SwaggerProperty({ required: false, enum: ENUM_STATUS, enumName: 'ENUM_STATUS' })
	@Property('Status')
	status?: ENUM_STATUS;

	@ApiHideProperty()
	where?: Where<T>;

	@ApiHideProperty()
	searchFields?: string[];

	@ApiHideProperty()
	relations?: string[];

	@ApiHideProperty()
	user?: RequestUser;
}
