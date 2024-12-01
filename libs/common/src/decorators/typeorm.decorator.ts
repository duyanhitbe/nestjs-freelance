import { Column, ColumnOptions, Index, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { camelToSnake } from '../helpers';
import { JoinColumnOptions } from 'typeorm/decorator/options/JoinColumnOptions';
import { ObjectType } from 'typeorm/common/ObjectType';
import { RelationOptions } from 'typeorm/decorator/options/RelationOptions';
import { UniqueOptions } from 'typeorm/decorator/options/UniqueOptions';

export function TypeormUnique(name?: string): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		let indexName = `IDX_UNIQUE_${target.constructor.name}_${propertyKey}`;

		if (name) indexName = name;

		Index(indexName, { unique: true, where: '"deleted_at" IS NULL' })(target, propertyKey);
	};
}

export function TypeormUniqueMulti<T>(
	properties: (keyof T)[],
	options?: UniqueOptions
): ClassDecorator {
	return function (target: any) {
		const indexName = `IDX_UNIQUE_${target.name}_${properties.map((property) => camelToSnake(property as string)).join('_')}`;

		Unique(indexName, properties as string[], options)(target);
	};
}

export function TypeormColumn(options?: ColumnOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const name = camelToSnake(propertyKey);
		Column({ ...options, name })(target, propertyKey);
	};
}

export function TypeormJoinColumn(options?: JoinColumnOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const name = options?.name || camelToSnake(propertyKey + 'Id');
		JoinColumn({ ...options, name })(target, propertyKey);
	};
}

export function TypeormManyToOne<T>(
	typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
	inverseSide?: string | ((object: T) => any),
	options?: RelationOptions
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const name = camelToSnake(propertyKey + 'Id');
		ManyToOne(typeFunctionOrTarget, inverseSide, options)(target, propertyKey);
		JoinColumn({ ...options, name })(target, propertyKey);
	};
}

export function TypeormOneToMany<T>(
	typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
	inverseSide: string | ((object: T) => any),
	options?: RelationOptions
): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		OneToMany(typeFunctionOrTarget, inverseSide, options)(target, propertyKey);
	};
}
