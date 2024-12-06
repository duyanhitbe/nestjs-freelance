import { config } from 'dotenv';

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmLogger } from '@lib/core/logger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { CreateUser1733021046881 } from '@lib/core/typeorm/migrations/1733021046881-create-user';
import { Initial1732268798149 } from '@lib/core/typeorm/migrations/1732268798149-initial';

config();
const configService = new ConfigService();

export const options: TypeOrmModuleOptions = {
	type: 'postgres',
	host: configService.get('POSTGRES_HOST'),
	port: +configService.get('POSTGRES_PORT'),
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	database: configService.get('POSTGRES_DB'),
	autoLoadEntities: true,
	synchronize: false,
	logger: new TypeOrmLogger(),
	migrationsTableName: 'migrations',
	migrationsRun: configService.get('TYPEORM_MIGRATION_RUN') === 'true',
	migrationsTransactionMode: 'each',
	migrations: [Initial1732268798149, CreateUser1733021046881]
};

export default new DataSource({
	...options,
	entities: ['**/*.typeorm.entity.ts']
} as any);
