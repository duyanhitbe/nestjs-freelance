import { PaginationMeta } from '@base/dto/pagination.dto';
import { IListResponse, IResponse } from '@common/interfaces';
import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export function SwaggerResponseType<T>(type: Type<T>, status = 200, isArray?: boolean) {
	class ClassResponse implements IResponse {
		@ApiProperty({ example: status })
		statusCode!: number;

		@ApiProperty({ example: 'success' })
		message!: string;

		@ApiProperty({ example: true })
		success!: boolean;

		@ApiProperty({ example: '/v1/api' })
		path!: string;

		@ApiProperty({ example: '0ms' })
		duration!: string;

		@ApiProperty({ type: isArray ? [type] : type })
		data!: T | T[];
	}

	Object.defineProperty(ClassResponse, 'name', {
		value: isArray ? `List${type.name}DataResponse` : `${type.name}Response`
	});

	return ClassResponse;
}

export function SwaggerListResponseType<T>(
	type: Type<T>,
	paginated: boolean,
	isEnum: boolean,
	enumName: string
) {
	const dataOptions: ApiPropertyOptions = isEnum
		? { example: Object.values(type) }
		: { type: [type] };

	class ClassPaginatedResponse implements IListResponse {
		@ApiProperty({ example: 200 })
		statusCode!: number;

		@ApiProperty({ example: 'success' })
		message!: string;

		@ApiProperty({ example: true })
		success!: boolean;

		@ApiProperty({ example: '/v1/api' })
		path!: string;

		@ApiProperty({ example: '0ms' })
		duration!: string;

		@ApiProperty(dataOptions)
		data!: T[];

		@ApiProperty()
		meta!: PaginationMeta;
	}

	class ClassListResponse implements IListResponse {
		@ApiProperty({ example: 200 })
		statusCode!: number;

		@ApiProperty({ example: 'success' })
		message!: string;

		@ApiProperty({ example: true })
		success!: boolean;

		@ApiProperty({ example: '/v1/api' })
		path!: string;

		@ApiProperty({ example: '0ms' })
		duration!: string;

		@ApiProperty(dataOptions)
		data!: T[];
	}

	Object.defineProperty(ClassListResponse, 'name', {
		value: `List${isEnum ? enumName : type.name}Response`
	});
	Object.defineProperty(ClassPaginatedResponse, 'name', {
		value: `List${type.name}PaginatedResponse`
	});

	return paginated ? ClassPaginatedResponse : ClassListResponse;
}
