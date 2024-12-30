export type RedisKeyOption = {
	key?: string | (string | number | null | undefined)[];
	prefix: string;
};
export type RedisSetOptions = RedisKeyOption & {
	value: any;
	/**
	 * Second
	 */
	ttl: number;
};
export type RedisSetNxOptions = Omit<RedisSetOptions, 'ttl'>;
export type RedisGetOptions = RedisKeyOption;
export type RedisDelOptions = RedisKeyOption;
