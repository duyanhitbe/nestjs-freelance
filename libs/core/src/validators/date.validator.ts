import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsFromDateBeforeToDateConstraint implements ValidatorConstraintInterface {
	validate(fromDate: Date, args: ValidationArguments): boolean {
		const object = args.object as any;
		const toDate = object.toDate;

		if (!fromDate || !toDate) return true; // Skip validation if either date is missing.
		return fromDate < toDate;
	}

	defaultMessage(): string {
		return `fromDate must be earlier than toDate.`;
	}
}

@ValidatorConstraint({ async: false })
export class IsToDateAfterFromDateConstraint implements ValidatorConstraintInterface {
	validate(fromDate: Date, args: ValidationArguments): boolean {
		const object = args.object as any;
		const toDate = object.toDate;

		if (!fromDate || !toDate || fromDate === toDate) return true; // Skip validation if either date is missing.
		return fromDate > toDate;
	}

	defaultMessage(): string {
		return `toDate must be later than fromDate.`;
	}
}

export function IsFromDateBeforeToDate(validationOptions?: ValidationOptions): PropertyDecorator {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return function (object: Function, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsFromDateBeforeToDateConstraint
		});
	};
}

export function IsToDateAfterFromDate(validationOptions?: ValidationOptions): PropertyDecorator {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return function (object: Function, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsToDateAfterFromDateConstraint
		});
	};
}
