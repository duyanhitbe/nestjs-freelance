import { Env } from '@common/interfaces';
import { HttpFilter, TypeormFilter } from '@core/filters';
import { HashModule } from '@core/hash/hash.module';
import { I18nModule } from '@core/i18n/i18n.module';
import { ResponseInterceptor } from '@core/interceptors';
import { ACCESS_TOKEN_EXPIRES } from '@core/jwt';
import { JwtModule } from '@core/jwt/jwt.module';
import { LoggerMiddleware } from '@core/middlewares';
import { NodemailerModule } from '@core/nodemailer/nodemailer.module';
import { InjectRedis } from '@core/redis';
import { RedisModule } from '@core/redis/redis.module';
import { TypeormModule } from '@core/typeorm/typeorm.module';
import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RedisStore } from 'connect-redis';
import * as session from 'express-session';
import Redis from 'ioredis';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppRepositoryModule } from './app.repository.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

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
