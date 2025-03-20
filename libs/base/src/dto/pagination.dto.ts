import { BaseEntity } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
	@ApiProperty()
	limit!: number;

	@ApiProperty()
	page!: number;

	@ApiProperty()
	totalItem!: number;

	@ApiProperty()
	totalPage!: number;

	@ApiProperty({ example: 0 })
	nextPage!: number | null;

	@ApiProperty({ example: 0 })
	prevPage!: number | null;
}

export class PaginationResponse<T extends BaseEntity> {
	@ApiProperty()
	data!: T[];

	@ApiProperty()
	meta!: PaginationMeta;

	static empty(): PaginationResponse<any> {
		return {
			data: [],
			meta: {
				limit: 10,
				page: 1,
				totalItem: 0,
				totalPage: 1,
				nextPage: null,
				prevPage: null
			}
		};
	}
}
