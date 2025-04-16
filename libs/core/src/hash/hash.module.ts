import { DynamicModule, Module } from '@nestjs/common';
import { HashService } from '@lib/core/hash/hash.service';
import { Argon2Service } from '@lib/core/hash/argon2.service';

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
