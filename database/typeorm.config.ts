import { TypeOrmLogger } from '@core/logger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { config } from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

config();

export const options: TypeOrmModuleOptions = {
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: +process.env.POSTGRES_PORT!,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: false,
	logger: new TypeOrmLogger(),
	migrationsTableName: 'migrations',
	migrationsTransactionMode: 'each',
	migrations: [path.join(__dirname, './migrations/*.ts')]
};

export default new DataSource({
	...options,
	entities: ['**/*.typeorm.entity.ts']
} as any);
