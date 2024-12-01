export function camelToSnake(str: string) {
	return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function snakeToCamel(str: string) {
	return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function removeBracket(str: string) {
	return str.replace(/\((.*?)\)/g, '$1');
}

export function randomString(length: number) {
	if (length <= 0) {
		throw new Error('Length must be a positive number.');
	}
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let result = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength);
		result += characters[randomIndex];
	}
	return result;
}
