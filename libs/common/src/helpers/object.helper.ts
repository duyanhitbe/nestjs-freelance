import { snakeToCamel } from '@common/helpers/string.helper';

export function isEmptyObject(obj: any) {
	return Object.keys(obj).length === 0;
}

export function toCamelCase(
	obj: Record<string, any> | Record<string, any>[]
): Record<string, any> | Record<string, any>[] {
	if (Array.isArray(obj)) {
		return obj.map((item) => toCamelCase(item));
	} else if (obj && typeof obj === 'object') {
		return Object.entries(obj).reduce(
			(acc, [key, value]) => {
				const camelKey = snakeToCamel(key);
				acc[camelKey] = value;
				return acc;
			},
			{} as Record<string, any>
		);
	}
	return obj;
}
