import { DynamicModule, Module } from '@nestjs/common';
import { REDIS_METADATA } from './redis.constant';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Env } from '@lib/common/interfaces';
import { RedisService } from '@lib/core/redis/redis.service';
import { RedisServiceImp } from '@lib/core/redis/redis-imp.service';

@Module({})
export class RedisModule {
	static forRoot(): DynamicModule {
		return {
			module: RedisModule,
			global: true,
			providers: [
				{
					provide: REDIS_METADATA,
					inject: [ConfigService],
					useFactory: (configService: ConfigService<Env>) =>
						new Redis({
							host: configService.getOrThrow<string>('REDIS_HOST'),
							port: +configService.getOrThrow<string>('REDIS_PORT'),
							username: configService.getOrThrow<string>('REDIS_USER'),
							password: configService.getOrThrow<string>('REDIS_PASSWORD'),
							db: +configService.getOrThrow<string>('REDIS_DB')
						})
				},
				{
					provide: RedisService,
					useClass: RedisServiceImp
				}
			],
			exports: [REDIS_METADATA, RedisService]
		};
	}
}
