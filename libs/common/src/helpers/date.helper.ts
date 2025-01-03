import * as moment from 'moment';

export function sortDates(dates: Date[], order: 'asc' | 'desc' = 'asc'): Date[] {
	return dates.sort((a, b) => {
		if (order === 'asc') {
			return a.getTime() - b.getTime(); // Ascending order
		} else {
			return b.getTime() - a.getTime(); // Descending order
		}
	});
}

export function getStartAndEndOfDay(dateString: string) {
	const date = new Date(dateString);
	const startOfDay = new Date(date);
	startOfDay.setUTCHours(0, 0, 0, 0);
	const endOfDay = new Date(date);
	endOfDay.setUTCHours(23, 59, 59, 999);
	return { startOfDay, endOfDay };
}

export function getStartOfDay(dateString: string) {
	const date = new Date(dateString);
	const startOfDay = new Date(date);
	startOfDay.setUTCHours(0, 0, 0, 0);
	return startOfDay;
}

export function getEndOfDay(dateString: string) {
	const date = new Date(dateString);
	const endOfDay = new Date(date);
	endOfDay.setUTCHours(23, 59, 59, 999);
	return endOfDay;
}

export function formatDate(date: Date, format: string) {
	return moment(date).format(format);
}
