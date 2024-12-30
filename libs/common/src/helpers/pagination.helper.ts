import { BaseFilterDto, PaginationMeta } from '@lib/base/dto';

type PageLimitOffset = {
	limit: number;
	page: number;
	offset: number;
};

export function getPageLimitOffset(limit: number, page: number): PageLimitOffset;
export function getPageLimitOffset(arg: BaseFilterDto): PageLimitOffset;
export function getPageLimitOffset(
	arg: BaseFilterDto | number,
	arg1?: number
): { limit: number; page: number; offset: number } {
	if (arg instanceof BaseFilterDto) {
		const limit = +(arg.limit || '25');
		const page = +(arg.page || '1');
		const offset = getOffset(limit, page);
		return { limit, page, offset };
	}

	if (typeof arg1 === 'number') {
		const limit = arg;
		const page = arg1;
		const offset = getOffset(limit, page);
		return { limit, page, offset };
	}

	return { limit: 25, page: 1, offset: 0 };
}

export function getMeta(limit: number, page: number, totalItem: number): PaginationMeta;
export function getMeta(filter: BaseFilterDto, totalItem: number): PaginationMeta;
export function getMeta(
	arg: number | BaseFilterDto,
	arg2: number,
	totalItem?: number
): PaginationMeta {
	if (arg instanceof BaseFilterDto) {
		const { limit, page } = getPageLimitOffset(arg);
		const totalPage = arg2 < limit ? 1 : Math.floor(arg2 / limit);
		const prevPage = page === 1 ? null : page - 1;
		const nextPage = page === totalPage ? null : page + 1;

		return {
			limit,
			page,
			totalItem: arg2,
			totalPage,
			prevPage,
			nextPage
		};
	}

	if (typeof totalItem === 'number') {
		const { limit, page } = getPageLimitOffset(arg, arg2);
		const totalPage = totalItem < limit ? 1 : Math.floor(totalItem / limit);
		const prevPage = page === 1 ? null : page - 1;
		const nextPage = page === totalPage ? null : page + 1;

		return {
			limit,
			page,
			totalItem,
			totalPage,
			prevPage,
			nextPage
		};
	}

	return {
		limit: 0,
		page: 0,
		totalItem: 0,
		totalPage: 0,
		prevPage: 0,
		nextPage: 0
	};
}

export function getOffset(limit: number, page: number): number {
	return limit * (page - 1);
}
