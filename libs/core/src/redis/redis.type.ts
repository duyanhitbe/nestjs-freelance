export type RedisSetOptions = {
	key: string;
	prefix: string;
	value: any;
	/**
	 * Second
	 */
	ttl: number;
};
export type RedisSetNxOptions = Omit<RedisSetOptions, 'ttl'>;
export type RedisGetOptions = {
	key: string;
	prefix: string;
};
