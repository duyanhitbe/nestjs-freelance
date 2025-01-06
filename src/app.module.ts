import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeormModule } from '@lib/core/typeorm/typeorm.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@lib/core/interceptors';
import { I18nModule } from '@lib/core/i18n/i18n.module';
import { HttpFilter, TypeormFilter } from '@lib/core/filters';
import { JwtModule } from '@lib/core/jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { HashModule } from '@lib/core/hash/hash.module';
import { AppRepositoryModule } from './app.repository.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RedisModule } from '@lib/core/redis/redis.module';
import { InjectRedis } from '@lib/core/redis';
import Redis from 'ioredis';
import { Env } from '@lib/common/interfaces';
import * as session from 'express-session';
import { LoggerMiddleware } from '@lib/core/middlewares';
import { ACCESS_TOKEN_EXPIRES } from '@lib/core/jwt';
import { RedisStore } from 'connect-redis';
import { NodemailerModule } from '@lib/core/nodemailer/nodemailer.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env'
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
			serveRoot: '/public'
		}),
		I18nModule.forRoot(),
		JwtModule.forRoot(),
		HashModule.forRoot(),
		TypeormModule.forRoot(),
		RedisModule.forRoot(),
		NodemailerModule.forRoot(),
		AppRepositoryModule,
		UserModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor
		},
		{
			provide: APP_FILTER,
			useClass: TypeormFilter
		},
		{
			provide: APP_FILTER,
			useClass: HttpFilter
		}
	]
})
export class AppModule implements NestModule {
	constructor(
		@InjectRedis()
		private readonly redis: Redis,
		private readonly configService: ConfigService<Env>
	) {}

	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				session({
					name: 'session',
					store: new RedisStore({
						client: this.redis,
						prefix: 'SESSION:'
					}),
					secret: this.configService.get('SESSION_SECRET')!,
					resave: false,
					saveUninitialized: false,
					cookie: {
						maxAge: ACCESS_TOKEN_EXPIRES * 1000,
						secure: false,
						httpOnly: true,
						sameSite: 'lax',
						signed: true
					}
				}),
				LoggerMiddleware
			)
			.forRoutes('*');
	}
}
