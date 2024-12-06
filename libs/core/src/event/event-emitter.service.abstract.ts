export abstract class EventEmitterService {
	abstract emit(pattern: string, data?: any): boolean;
}
