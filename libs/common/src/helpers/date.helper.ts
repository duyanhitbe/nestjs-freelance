export function sortDates(dates: Date[], order: 'asc' | 'desc' = 'asc'): Date[] {
	return dates.sort((a, b) => {
		if (order === 'asc') {
			return a.getTime() - b.getTime(); // Ascending order
		} else {
			return b.getTime() - a.getTime(); // Descending order
		}
	});
}
