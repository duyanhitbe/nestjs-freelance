import { IsFromDateBeforeToDate, IsToDateAfterFromDate } from '@core/validators';
import {
	IsArray,
	IsBoolean,
	IsDateString,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsNumberString,
	IsString,
	IsUrl,
	IsUUID,
	Matches,
	Max,
	MaxLength,
	Min,
	MinLength
} from 'class-validator';
import { IsNumberOptions } from 'class-validator/types/decorator/typechecker/IsNumber';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { i18nValidationMessage } from 'nestjs-i18n';
import * as ValidatorJS from 'validator';
import { getProperty } from './property.decorator';

export type I18nValidationOptions = ValidationOptions & {
	property?: string;
};

export type I18nLengthValidationOptions = I18nValidationOptions & {
	isArray?: boolean;
};

export type I18nDurationDateValidationOptions = ValidationOptions & {
	fromDateProperty?: string;
	toDateProperty?: string;
};

export function I18nIsNotEmpty(options?: I18nValidationOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsNotEmpty({
			...options,
			message: i18nValidationMessage('validation.IS_NOT_EMPTY', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsString(options?: I18nValidationOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsString({
			...options,
			message: i18nValidationMessage('validation.IS_STRING', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsVNPhoneNumber(options?: I18nValidationOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		Matches(/^(\+84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/, {
			message: i18nValidationMessage('validation.IS_VN_PHONE_NUMBER', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsNumberString(
	options?: I18nValidationOptions & ValidatorJS.IsNumericOptions
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsNumberString(options, {
			...options,
			message: i18nValidationMessage('validation.IS_NUMBER_STRING', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsEmail(
	options?: I18nValidationOptions & ValidatorJS.IsNumericOptions
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsEmail(options, {
			...options,
			message: i18nValidationMessage('validation.IS_EMAIL', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsUUID(
	options?: I18nValidationOptions & ValidatorJS.UUIDVersion
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsUUID(options, {
			...options,
			message: i18nValidationMessage('validation.IS_UUID', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsNumber(options?: I18nValidationOptions & IsNumberOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsNumber(options, {
			...options,
			message: i18nValidationMessage('validation.IS_NUMBER', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsBoolean(options?: I18nValidationOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsBoolean({
			...options,
			message: i18nValidationMessage('validation.IS_BOOLEAN', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsEnum(entity: object, options?: I18nValidationOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		const values = Object.values(entity).join(', ');
		IsEnum(entity, {
			...options,
			message: i18nValidationMessage('validation.IS_ENUM', {
				property,
				values
			})
		})(target, propertyKey);
	};
}

export function I18nIsUrl(
	options?: I18nValidationOptions & ValidatorJS.IsURLOptions
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsUrl(options, {
			...options,
			message: i18nValidationMessage('validation.IS_URL', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsDateString(
	options?: I18nValidationOptions & ValidatorJS.IsISO8601Options
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsDateString(options, {
			...options,
			message: i18nValidationMessage('validation.IS_DATE_STRING', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsArray(options?: I18nValidationOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsArray({
			...options,
			message: i18nValidationMessage('validation.IS_ARRAY', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nMin(value: number, options?: I18nValidationOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		Min(value, {
			...options,
			message: i18nValidationMessage('validation.MIN', {
				property,
				value
			})
		})(target, propertyKey);
	};
}

export function I18nMax(value: number, options?: I18nValidationOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		Max(value, {
			...options,
			message: i18nValidationMessage('validation.MAX', {
				property,
				value
			})
		})(target, propertyKey);
	};
}

export function I18nMinLength(
	value: number,
	options?: I18nLengthValidationOptions
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		MinLength(value, {
			...options,
			message: i18nValidationMessage(
				`validation.${options?.isArray ? 'MIN_LENGTH_ARRAY' : 'MIN_LENGTH'}`,
				{
					property,
					value
				}
			)
		})(target, propertyKey);
	};
}

export function I18nMaxLength(
	value: number,
	options?: I18nLengthValidationOptions
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		MaxLength(value, {
			...options,
			message: i18nValidationMessage(
				`validation.${options?.isArray ? 'MAX_LENGTH_ARRAY' : 'MAX_LENGTH'}`,
				{
					property,
					value
				}
			)
		})(target, propertyKey);
	};
}

export function I18nIsFromDateBeforeToDate(
	options?: I18nDurationDateValidationOptions
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const fromDateProperty = getProperty(target, options?.fromDateProperty || propertyKey);
		const toDateProperty = getProperty(target, options?.toDateProperty || 'toDate');

		IsFromDateBeforeToDate({
			message: i18nValidationMessage('validation.IS_FROM_DATE_BEFORE_TO_DATE', {
				fromDate: fromDateProperty,
				toDate: toDateProperty
			})
		})(target, propertyKey);
	};
}

export function I18nIsToDateAfterFromDate(
	options?: I18nDurationDateValidationOptions
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const fromDateProperty = getProperty(target, options?.fromDateProperty || 'fromDate');
		const toDateProperty = getProperty(target, options?.toDateProperty || propertyKey);
		IsToDateAfterFromDate({
			message: i18nValidationMessage('validation.IS_TO_DATE_AFTER_FROM_DATE', {
				fromDate: fromDateProperty,
				toDate: toDateProperty
			})
		})(target, propertyKey);
	};
}
