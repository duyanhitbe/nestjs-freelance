import { camelToSnake, getMeta, getPageLimitOffset } from '@lib/common/helpers';
import { I18nExceptionService } from '@lib/core/i18n';
import { Logger } from '@nestjs/common';
import { set } from 'lodash';
import { Brackets, In, Repository, SelectQueryBuilder } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { PaginationResponse } from '../dto';
import { BaseTypeormEntity } from '../entities';
import { BaseRepository } from '../repositories/repository.base.abstract';
import {
	CreateOptions,
	DecrementOptions,
	DeleteByIdOptions,
	DeleteManyOptions,
	DeleteOneOptions,
	FindByIdOptions,
	FindOneOptions,
	FindOptions,
	FindPaginatedOptions,
	IncrementOptions,
	SoftDeleteByIdOptions,
	SoftDeleteManyOptions,
	SoftDeleteOneOptions,
	UpdateByIdOptions,
	UpdateManyOptions,
	UpdateOneOptions
} from '../types';

export class BaseTypeormRepository<T extends BaseTypeormEntity> implements BaseRepository<T> {
	protected readonly logger = new Logger(this.constructor.name);

	constructor(
		protected readonly repository: Repository<T>,
		protected readonly entityName: string,
		protected readonly i18nExceptionService: I18nExceptionService
	) {}

	protected throwErrorNotFound(): never {
		this.i18nExceptionService.throwNotFoundEntity(this.entityName);
	}

	protected addSearchFields(
		queryBuilder: SelectQueryBuilder<T>,
		alias: string,
		searchFields?: string[],
		search?: string
	): void {
		if (searchFields && search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					searchFields.forEach((field) => {
						qb.orWhere(`${alias}.${field} ILIKE '%${search}%'`);
					});
				})
			);
		}
	}

	async create(options: CreateOptions<T>): Promise<T> {
		const { data } = options;

		const entity = this.repository.create(data as DeepPartial<T>);

		return entity.save();
	}

	find(options: FindOptions<T>): Promise<T[]> {
		const { where, select, relations } = options;
		return this.repository.find({ where, select: select as any, relations: relations as any });
	}

	async findPaginated(options: FindPaginatedOptions<T>): Promise<PaginationResponse<T>> {
		const {
			alias = this.constructor.name,
			select,
			relations,
			where,
			search,
			searchFields,
			status
		} = options;

		set(options, 'order.created_at', 'DESC');

		const { limit, offset } = getPageLimitOffset(options);
		const queryBuilder = this.repository.createQueryBuilder(alias);
		const countQueryBuilder = this.repository.createQueryBuilder(alias);

		if (relations) {
			relations.forEach((relation) => {
				queryBuilder.leftJoinAndSelect(`${alias}.${relation}`, relation);
			});
		}

		if (where) {
			queryBuilder.andWhere(where);
			countQueryBuilder.andWhere(where);
		}

		if (status) {
			queryBuilder.andWhere({ status });
			countQueryBuilder.andWhere({ status });
		}

		if (select) {
			select.forEach((field) => {
				const snakeCase = camelToSnake(field as string);
				queryBuilder.select(`${alias}.${snakeCase} AS "${field as string}"`);
			});
		}

		if (search && searchFields) {
			this.addSearchFields(queryBuilder, alias, searchFields, search);
			this.addSearchFields(countQueryBuilder, alias, searchFields, search);
		}

		Object.entries(options.order || {}).forEach(([key, value]) => {
			const snakeCase = camelToSnake(key);
			queryBuilder.orderBy(`${alias}.${snakeCase}`, value as any);
		});

		const [data, count] = await Promise.all([
			queryBuilder.limit(limit).offset(offset).getMany(),
			countQueryBuilder.getCount()
		]);
		const meta = getMeta(options, count);

		return {
			data,
			meta
		};
	}

	findById(options: FindByIdOptions<T>): Promise<T | null> {
		const { id, select, relations } = options;
		return this.repository.findOne({
			where: { id } as any,
			select: select as any,
			relations: relations as any
		});
	}

	findOne(options: FindOneOptions<T>): Promise<T | null> {
		const { where, select, relations } = options;
		return this.repository.findOne({
			where,
			select: select as any,
			relations: relations as any
		});
	}

	async findByIdOrThrow(options: FindByIdOptions<T>): Promise<T> {
		const { id, select, relations } = options;
		const entity = await this.repository.findOne({
			where: { id } as any,
			select: select as any,
			relations: relations as any
		});
		if (!entity) this.throwErrorNotFound();
		return entity;
	}

	async findOneOrThrow(options: FindOneOptions<T>): Promise<T> {
		const { where, select, relations } = options;
		const entity = await this.repository.findOne({
			where,
			select: select as any,
			relations: relations as any
		});
		if (!entity) this.throwErrorNotFound();
		return entity;
	}

	async update(options: UpdateManyOptions<T>): Promise<T[]> {
		const { where, select, data, relations } = options;
		const entities = await this.repository.find({
			where,
			select: select as any,
			relations: relations as any
		});

		if (entities.length) {
			const ids = entities.map((entity) => entity.id);
			await this.repository.update(
				{
					id: In(ids)
				} as any,
				data
			);
			return entities.map((entity) => {
				Object.assign(entity, data);
				return entity;
			});
		}

		return [];
	}

	async updateOne(options: UpdateOneOptions<T>): Promise<T> {
		const { where, select, data, relations } = options;
		const entity = await this.findOne({ where, select, relations: relations as any });
		if (!entity) this.throwErrorNotFound();
		await this.repository.update(where, data);
		Object.assign(entity, data);
		return entity;
	}

	async updateById(options: UpdateByIdOptions<T>): Promise<T> {
		const { id, data, select, relations } = options;
		const entity = await this.findById({ id, select, relations: relations as any });
		if (!entity) this.throwErrorNotFound();
		await this.repository.update(id, data);
		Object.assign(entity, data);
		return entity;
	}

	async delete(options: DeleteManyOptions<T>): Promise<T[]> {
		const { where, select, relations } = options;
		const entities = await this.repository.find({
			where,
			select: select as any,
			relations: relations as any
		});
		if (entities.length) {
			const ids = entities.map((entity) => entity.id);
			await this.repository.delete({
				id: In(ids)
			} as any);
		}
		return entities;
	}

	async deleteOne(options: DeleteOneOptions<T>): Promise<T> {
		const { where, select, relations } = options;
		const entity = await this.findOne({ where, select, relations: relations as any });
		if (!entity) this.throwErrorNotFound();
		await this.repository.delete(where);
		return entity;
	}

	async deleteById(options: DeleteByIdOptions<T>): Promise<T> {
		const { id, select, relations } = options;
		const entity = await this.findById({ id, select, relations: relations as any });
		if (!entity) this.throwErrorNotFound();
		await this.repository.delete(id);
		return entity;
	}

	async softDelete(options: SoftDeleteManyOptions<T>): Promise<T[]> {
		const { where, select, relations } = options;
		const entities = await this.repository.find({
			where,
			select: select as any,
			relations: relations as any
		});
		if (entities.length) {
			const ids = entities.map((entity) => entity.id);
			await this.repository.softDelete({
				id: In(ids)
			} as any);
		}
		return entities;
	}

	async softDeleteOne(options: SoftDeleteOneOptions<T>): Promise<T> {
		const { where, select, relations } = options;
		const entity = await this.findOne({ where, select, relations: relations as any });
		if (!entity) this.throwErrorNotFound();
		await this.repository.softDelete(where);
		return entity;
	}

	async softDeleteById(options: SoftDeleteByIdOptions<T>): Promise<T> {
		const { id, select, relations } = options;
		const entity = await this.findById({ id, select, relations: relations as any });
		if (!entity) this.throwErrorNotFound();
		await this.repository.softDelete(id);
		return entity;
	}

	async exists(options: FindOneOptions<T>): Promise<boolean> {
		const { where } = options;
		return this.repository.exists({ where });
	}

	async increment(options: IncrementOptions<T>): Promise<number> {
		return this.repository
			.increment(options.where, options.column as any, options.value)
			.then((res) => res.affected || 0);
	}

	async decrement(options: DecrementOptions<T>): Promise<number> {
		return this.repository
			.decrement(options.where, options.column as any, options.value)
			.then((res) => res.affected || 0);
	}
}
