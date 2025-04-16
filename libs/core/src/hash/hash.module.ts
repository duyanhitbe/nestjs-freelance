import { Argon2Service } from '@core/hash/argon2.service';
import { HashService } from '@core/hash/hash.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class HashModule {
	static forRoot(): DynamicModule {
		return {
			module: HashModule,
			global: true,
			providers: [
				{
					provide: HashService,
					useClass: Argon2Service
				}
			],
			exports: [HashService]
		};
	}
}
