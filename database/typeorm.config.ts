import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { TypeOrmLogger } from '@lib/core/logger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import * as path from 'path';

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
