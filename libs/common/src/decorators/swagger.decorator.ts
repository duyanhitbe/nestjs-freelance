import { applyDecorators } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiProperty,
	ApiPropertyOptions
} from '@nestjs/swagger';
import { SwaggerListResponseType, SwaggerOptions, SwaggerResponseType } from '../swagger';
import { getProperty } from './property.decorator';

export function SwaggerCreatedResponse(options: SwaggerOptions) {
	const { summary, type, isArray } = options;

	return applyDecorators(
		ApiOperation({ summary }),
		ApiCreatedResponse({ type: SwaggerResponseType(type, 201, isArray) })
	);
}

export function SwaggerOkResponse(options: SwaggerOptions) {
	const { summary, type } = options;

	return applyDecorators(
		ApiOperation({ summary }),
		ApiOkResponse({ type: SwaggerResponseType(type) })
	);
}

export function SwaggerListResponse(options: SwaggerOptions) {
	const { summary, type, paginated = true, isEnum = false, enumName = '' } = options;

	return applyDecorators(
		ApiOperation({ summary }),
		ApiOkResponse({ type: SwaggerListResponseType(type, paginated, isEnum, enumName) })
	);
}

export function SwaggerProperty(options?: ApiPropertyOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey);
		ApiProperty({
			description: property,
			...options
		})(target, propertyKey);
	};
}
