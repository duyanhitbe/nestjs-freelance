import {
	CreateOptions,
	DecrementOptions,
	DeleteByIdOptions,
	DeleteManyOptions,
	DeleteOneOptions,
	ExistOptions,
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
import { BaseEntity } from '../entities';
import { PaginationResponse } from '../dto';

export abstract class BaseRepository<T extends BaseEntity> {
	abstract create(options: CreateOptions<T>): Promise<T>;

	abstract find(options: FindOptions<T>): Promise<T[]>;

	abstract findPaginated(options: FindPaginatedOptions<T>): Promise<PaginationResponse<T>>;

	abstract findById(options: FindByIdOptions<T>): Promise<T | null>;

	abstract findOne(options: FindOneOptions<T>): Promise<T | null>;

	abstract findByIdOrThrow(options: FindByIdOptions<T>): Promise<T>;

	abstract findOneOrThrow(options: FindOneOptions<T>): Promise<T>;

	abstract update(options: UpdateManyOptions<T>): Promise<T[]>;

	abstract updateOne(options: UpdateOneOptions<T>): Promise<T>;

	abstract updateById(options: UpdateByIdOptions<T>): Promise<T>;

	abstract delete(options: DeleteManyOptions<T>): Promise<T[]>;

	abstract deleteOne(options: DeleteOneOptions<T>): Promise<T>;

	abstract deleteById(options: DeleteByIdOptions<T>): Promise<T>;

	abstract softDelete(options: SoftDeleteManyOptions<T>): Promise<T[]>;

	abstract softDeleteOne(options: SoftDeleteOneOptions<T>): Promise<T>;

	abstract softDeleteById(options: SoftDeleteByIdOptions<T>): Promise<T>;

	abstract exists(options: ExistOptions<T>): Promise<boolean>;

	abstract increment(options: IncrementOptions<T>): Promise<number>;

	abstract decrement(options: DecrementOptions<T>): Promise<number>;
}
