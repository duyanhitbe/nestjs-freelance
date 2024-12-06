import { In, Repository } from 'typeorm';
import {
	CreateOptions,
	DeleteByIdOptions,
	DeleteManyOptions,
	DeleteOneOptions,
	FindByIdOptions,
	FindOneOptions,
	FindOptions,
	FindPaginatedOptions,
	SoftDeleteByIdOptions,
	SoftDeleteManyOptions,
	SoftDeleteOneOptions,
	UpdateByIdOptions,
	UpdateManyOptions,
	UpdateOneOptions
} from '../types';
import { BaseTypeormEntity } from '../entities';
import { PaginationResponse } from '../dto';
import { BaseRepository } from '../repositories/repository.base.abstract';
import { I18nExceptionService } from '@lib/core/i18n';
import { getMeta, getOffset } from '@lib/common/helpers';
import { Logger } from '@nestjs/common';

export class BaseTypeormRepository<T extends BaseTypeormEntity> implements BaseRepository<T> {
	protected readonly logger = new Logger(this.constructor.name);

	constructor(
		protected readonly repository: Repository<T>,
		private readonly entityName: string,
		private readonly i18nExceptionService: I18nExceptionService
	) {}

	private throwErrorNotFound(): never {
		this.i18nExceptionService.throwNotFoundEntity(this.entityName);
	}

	async create(options: CreateOptions<T>): Promise<T> {
		const { data, returning } = options;
		const result = await this.repository
			.createQueryBuilder()
			.insert()
			.into(this.repository.target) // Specify the target entity/table
			.values(data as any)
			.returning(returning as any) // Add RETURNING clause
			.execute();

		// Extract and return the first row of the inserted data
		return result.raw[0] as T;
	}

	find(options: FindOptions<T>): Promise<T[]> {
		const { where, select, relations } = options;
		return this.repository.find({ where, select: select as any, relations: relations as any });
	}

	async findPaginated(options: FindPaginatedOptions<T>): Promise<PaginationResponse<T>> {
		const { where, select, offset, relations } = options;

		let order = options.order;
		if (!order) order = {};
		order.createdAt = 'DESC';

		const limit = +(options.limit || 25);
		const page = +(options.page || 1);
		const take = limit || 10;
		const skip = offset || getOffset(limit, page);

		const [data, totalItem] = await this.repository.findAndCount({
			where,
			take,
			skip,
			order: order as any,
			select: select as any,
			relations: relations as any
		});

		const meta = getMeta(limit, page, totalItem);

		return {
			data,
			meta: meta as any
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
}
