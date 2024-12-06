import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service.abstract';
import { InjectRedis } from './redis.decorator';
import Redis from 'ioredis';
import { RedisGetOptions, RedisSetNxOptions, RedisSetOptions } from './redis.type';

@Injectable()
export class RedisServiceImp extends RedisService {
	constructor(@InjectRedis() private readonly redis: Redis) {
		super();
	}

	async set(options: RedisSetOptions): Promise<void> {
		const { key, prefix, value, ttl } = options;
		const setKey = [prefix, key].join(':');
		await this.redis.set(setKey, JSON.stringify(value), 'EX', ttl);
		this.logger.log(`Cached data with key=${setKey} | ttl=${ttl}s`);
		this.logger.debug(value);
	}

	async setNx(options: RedisSetNxOptions): Promise<void> {
		const { key, prefix, value } = options;
		const setKey = [prefix, key].join(':');
		await this.redis.setnx(setKey, JSON.stringify(value));
		this.logger.log(`Cached data with key=${setKey} | ttl=forever`);
		this.logger.debug(value);
	}

	async get<T = any>(options: RedisGetOptions): Promise<T | null> {
		const { key, prefix } = options;
		const getKey = [prefix, key].join(':');
		const value = await this.redis.get(getKey);
		if (!value) {
			this.logger.log(`Not found cached data with key: ${getKey}`);
			return null;
		}
		const result = JSON.parse(value);
		this.logger.log(`Found cached data with key: ${getKey}`);
		this.logger.debug(result);
		return result;
	}

	async del(options: RedisGetOptions): Promise<void> {
		const { key, prefix } = options;
		const delKey = [prefix, key].join(':');
		await this.redis.del(delKey);
		this.logger.log(`Deleted cached data with key: ${delKey}`);
	}
}
