import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service.abstract';
import { InjectRedis } from './redis.decorator';
import Redis from 'ioredis';
import {
	RedisDelOptions,
	RedisGetOptions,
	RedisKeyOption,
	RedisSetNxOptions,
	RedisSetOptions
} from './redis.type';

@Injectable()
export class RedisServiceImp extends RedisService {
	constructor(@InjectRedis() private readonly redis: Redis) {
		super();
	}

	private get shouldCache(): boolean {
		return process.env.NODE_ENV === 'production';
	}

	private get shouldDebug(): boolean {
		return process.env.IS_DEBUG_REDIS === 'true';
	}

	private getKey(options: RedisKeyOption): string {
		const { key, prefix } = options;
		let result = '';
		if (typeof key === 'string') {
			const keys: (string | number)[] = [prefix];
			if (key) {
				keys.push(key);
			}
			result = keys.join(':');
		} else {
			const keys: (string | number)[] = [prefix];
			if (key) {
				key.forEach((k) => {
					if (k) keys.push(k);
				});
			}
			result = keys.join(':');
		}
		return result;
	}

	async set(options: RedisSetOptions): Promise<void> {
		if (!this.shouldCache) return;
		const { value, ttl } = options;
		const setKey = this.getKey(options);
		await this.redis.set(setKey, JSON.stringify(value), 'EX', ttl);
		this.logger.log(`Cached data with key=${setKey} | ttl=${ttl}s`);
		if (this.shouldDebug) {
			this.logger.debug(value);
		}
	}

	async setNx(options: RedisSetNxOptions): Promise<void> {
		if (!this.shouldCache) return;
		const { value } = options;
		const setKey = this.getKey(options);
		await this.del(options);
		await this.redis.setnx(setKey, JSON.stringify(value));
		this.logger.log(`Cached data with key=${setKey} | ttl=forever`);
		if (this.shouldDebug) {
			this.logger.debug(value);
		}
	}

	async get<T = any>(options: RedisGetOptions): Promise<T | null> {
		if (!this.shouldCache) return null;

		const getKey = this.getKey(options);
		const value = await this.redis.get(getKey);
		if (!value) {
			this.logger.log(`Not found cached data with key: ${getKey}`);
			return null;
		}
		const result = JSON.parse(value);
		this.logger.log(`Found cached data with key: ${getKey}`);
		if (this.shouldDebug) {
			this.logger.debug(result);
		}
		return result;
	}

	async del(options: RedisDelOptions): Promise<void> {
		if (!this.shouldCache) return;
		const delKey = this.getKey(options);
		await this.redis.del(delKey);
		this.logger.log(`Deleted cached data with key: ${delKey}`);
	}

	async delGroup(options: RedisDelOptions): Promise<void> {
		if (!this.shouldCache) return;
		const delKey = this.getKey(options) + ':*';
		const keys = await this.redis.keys(delKey);
		await Promise.all(
			keys.map(async (key) => {
				await this.redis.del(key);
			})
		);
		this.logger.log(`Deleted cached data with key: ${delKey}`);
	}
}
