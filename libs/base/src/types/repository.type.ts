import { BaseEntity } from '../entities';

export type Where<T extends BaseEntity> = {
	[P in keyof T]?: any;
};

export type Data<T extends BaseEntity> = {
	[P in keyof T]?: any;
};

export type OrderType = 'ASC' | 'DESC' | 'asc' | 'desc' | 1 | -1;

export type Order<T extends BaseEntity> = {
	[P in keyof T]?: OrderType;
};

export type FindOptionsSelectProperty<Property> =
	Property extends Promise<infer I>
		? FindOptionsSelectProperty<I> | boolean
		: Property extends Array<infer I>
			? FindOptionsSelectProperty<I> | boolean
			: Property extends string
				? boolean
				: Property extends number
					? boolean
					: Property extends boolean
						? boolean
						: // eslint-disable-next-line @typescript-eslint/ban-types
							Property extends Function
							? never
							: Property extends Buffer
								? boolean
								: Property extends Date
									? boolean
									: Property extends object
										? FindOptionsSelect<Property>
										: boolean;

export type FindOptionsSelect<Entity> = {
	[P in keyof Entity]?: P extends 'toString'
		? unknown
		: FindOptionsSelectProperty<NonNullable<Entity[P]>>;
};

export type FindOptionsSelectByString<Entity> = (keyof Entity)[];

export type Select<T extends BaseEntity> = FindOptionsSelect<T> | FindOptionsSelectByString<T>;

export type Relation<T extends BaseEntity> = string[];

export type CreateOptions<T extends BaseEntity> = {
	data: Data<T>;
	select?: Select<T>;
	returning?: (keyof T)[];
};

export type FindOptions<T extends BaseEntity> = {
	where?: Where<T>;
	order?: Order<T>;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type FindPaginatedOptions<T extends BaseEntity> = {
	where?: Where<T>;
	order?: Order<T>;
	limit?: number | string;
	page?: number | string;
	offset?: number;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type FindByIdOptions<T extends BaseEntity> = {
	id: string;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type FindOneOptions<T extends BaseEntity> = {
	where?: Where<T>;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type UpdateManyOptions<T extends BaseEntity> = {
	where: Where<T>;
	order?: Order<T>;
	data: Data<T>;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type UpdateOneOptions<T extends BaseEntity> = {
	where: Where<T>;
	data: Data<T>;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type UpdateByIdOptions<T extends BaseEntity> = {
	id: string;
	data: Data<T>;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type DeleteManyOptions<T extends BaseEntity> = {
	where: Where<T>;
	order?: Order<T>;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type DeleteOneOptions<T extends BaseEntity> = {
	where: Where<T>;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type DeleteByIdOptions<T extends BaseEntity> = {
	id: string;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type SoftDeleteManyOptions<T extends BaseEntity> = {
	where: Where<T>;
	order?: Order<T>;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type SoftDeleteOneOptions<T extends BaseEntity> = {
	where: Where<T>;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type SoftDeleteByIdOptions<T extends BaseEntity> = {
	id: string;
	select?: Select<T>;
	relations?: Relation<T>;
};

export type ExistOptions<T extends BaseEntity> = {
	where?: Where<T>;
	select?: Select<T>;
};
