import { Inject, Logger } from '@nestjs/common';
import { REDIS_METADATA } from './redis.constant';
import Redis from 'ioredis';
import { RedisServiceImp } from '@lib/core/redis/redis.service';

export function InjectRedis(): ParameterDecorator {
	return function (
		// eslint-disable-next-line @typescript-eslint/ban-types
		target: Function,
		propertyKey: string | symbol | undefined,
		parameterIndex: number
	) {
		Inject(REDIS_METADATA)(target, propertyKey, parameterIndex);
	};
}

type CacheOptions = {
	key?: string | string[];
	prefix: string;
	/**
	 * Second
	 */
	ttl?: number;
};

export function Cache(options: CacheOptions): MethodDecorator {
	return function (target: any, propertyKey: any, descriptor: any) {
		const originalMethod = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			const redis = new Redis({
				host: process.env.REDIS_HOST,
				port: +process.env.REDIS_PORT!,
				username: process.env.REDIS_USER,
				password: process.env.REDIS_PASSWORD,
				db: +process.env.REDIS_DB!
			});
			const redisService = new RedisServiceImp(redis);

			const cachedData = await redisService.get(options);
			if (cachedData) return cachedData;

			try {
				const result = await originalMethod.apply(this, args);

				if (options.ttl) {
					redisService.set({
						...options,
						ttl: options.ttl,
						value: result
					});
				} else {
					redisService.setNx({
						...options,
						value: result
					});
				}

				return result;
			} catch (e) {
				new Logger('CacheDecorator').error(e);
				throw e;
			}
		};
		Reflect.getMetadataKeys(originalMethod).forEach((key) => {
			const metadata = Reflect.getMetadata(key, originalMethod);
			Reflect.defineMetadata(key, metadata, descriptor.value);
		});
		return descriptor;
	};
}
