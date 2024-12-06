export function getMeta(limit: number, page: number, totalItem: number) {
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

export function getOffset(limit: number, page: number) {
	return limit * (page - 1);
}
