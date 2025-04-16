import { Env } from '@common/interfaces';
import { setupSwagger } from '@common/swagger';
import { LoggerService } from '@core/logger';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new LoggerService()
	});
	const configService = app.get<ConfigService<Env>>(ConfigService);
	const port = +configService.get('PORT');
	const baseUrl = configService.get('BASE_URL');

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1'
	});
	app.setGlobalPrefix('api', {
		exclude: ['/']
	});
	app.useGlobalPipes(
		new I18nValidationPipe({
			transform: true,
			whitelist: true
		})
	);
	setupSwagger(app);
	await app.listen(port);

	const logger = new Logger('NestApplication');
	logger.log(`Server is running on ${baseUrl}`);
	logger.log(`Swagger is running on ${baseUrl}/docs`);
}

bootstrap();
