import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TypeormForFeaturesOptions } from './typeorm.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { REPOSITORY_ENTITY } from './typeorm.decorator';
import { I18nExceptionService } from '@lib/core/i18n';
import { TypeOrmLogger } from '@lib/core/logger';

@Global()
@Module({})
export class TypeormModule {
	static forRoot(): DynamicModule {
		return {
			module: TypeormModule,
			imports: [
				TypeOrmModule.forRootAsync({
					inject: [ConfigService],
					useFactory: (configService: ConfigService) => ({
						type: 'postgres',
						host: configService.get('POSTGRES_HOST'),
						port: +configService.get('POSTGRES_PORT'),
						username: configService.get('POSTGRES_USER'),
						password: configService.get('POSTGRES_PASSWORD'),
						database: configService.get('POSTGRES_DB'),
						autoLoadEntities: true,
						synchronize: false,
						logger: new TypeOrmLogger()
					})
				})
			]
		};
	}

	static forFeatures(options: TypeormForFeaturesOptions): DynamicModule {
		const { entities, repositories } = options;

		const exports: any[] = [];
		const providers: Provider[] = repositories.map(({ provide, useClass: Repository }) => {
			exports.push(provide);
			return {
				provide,
				inject: [DataSource, I18nExceptionService],
				useFactory: (
					dataSource: DataSource,
					i18nExceptionService: I18nExceptionService
				) => {
					const entity = Reflect.getOwnMetadata(REPOSITORY_ENTITY, Repository);
					const repository = dataSource.getRepository(entity);
					return new Repository(repository, entity.name, i18nExceptionService);
				}
			};
		});

		return {
			module: TypeormModule,
			global: true,
			imports: [TypeOrmModule.forFeature(entities)],
			providers,
			exports
		};
	}
}
