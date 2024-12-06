import { DynamicModule, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterServiceImp } from './event-emitter.service';
import { EventEmitterService } from './event-emitter.service.abstract';

@Module({})
export class EventModule {
	static forRoot(): DynamicModule {
		return {
			module: EventModule,
			global: true,
			imports: [
				EventEmitterModule.forRoot({
					global: true,
					maxListeners: 10
				})
			],
			providers: [
				{
					provide: EventEmitterService,
					useClass: EventEmitterServiceImp
				}
			],
			exports: [EventEmitterService]
		};
	}
}
