import { Logger } from '@nestjs/common';
import { RedisDelOptions, RedisGetOptions, RedisSetNxOptions, RedisSetOptions } from './redis.type';

export abstract class RedisService {
	protected readonly logger = new Logger(this.constructor.name);

	abstract set(options: RedisSetOptions): Promise<void>;

	abstract setNx(options: RedisSetNxOptions): Promise<void>;

	abstract get<T = any>(options: RedisGetOptions): Promise<T | null>;

	abstract del(options: RedisDelOptions): Promise<void>;

	abstract delGroup(options: RedisDelOptions): Promise<void>;
}
