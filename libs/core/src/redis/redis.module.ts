import { Env } from '@common/interfaces';
import { RedisServiceImp } from '@core/redis/redis-imp.service';
import { RedisService } from '@core/redis/redis.service';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_METADATA } from './redis.constant';

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
