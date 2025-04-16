import { LoggerService } from '@core/logger';

export interface LoggingOptions {
	/** Should debug return value */
	returned?: boolean;
	/** Should debug args value */
	args?: boolean;
}

export function Logging(options: LoggingOptions = {}): ClassDecorator & MethodDecorator {
	return function (target: any, propertyKey?: any, descriptor?: any) {
		function loggerFunction(logger: LoggerService, originalMethod: any, methodName: string) {
			return async function (...args: any[]) {
				logger.log(`[START] ${methodName}`);
				if (args.length && options.args) {
					logger.debug(`[ARGS] ${methodName} `);
					logger.debug(args);
				}
				const start = new Date().getTime();
				try {
					const result = await originalMethod.apply(this, args);
					if (options.returned && result) {
						logger.debug(`[RETURNED] ${methodName}`);
						logger.debug(result);
					}
					return result;
				} catch (error) {
					logger.error(`[EXCEPTION] ${methodName}`);
					throw error;
				} finally {
					const end = new Date().getTime();
					logger.log(`[END] ${methodName} took ${end - start}ms`);
				}
			};
		}

		//MethodDecorator
		if (propertyKey && descriptor) {
			const logger = new LoggerService(target.constructor.name);

			const originalMethod = descriptor.value;
			descriptor.value = loggerFunction(logger, originalMethod, propertyKey);
			Reflect.getMetadataKeys(originalMethod).forEach((key) => {
				const metadata = Reflect.getMetadata(key, originalMethod);
				Reflect.defineMetadata(key, metadata, descriptor.value);
			});
			return descriptor;
		}

		//ClassDecorator
		const logger = new LoggerService(target.name);
		const methods = Object.getOwnPropertyNames(target.prototype);
		for (const method of methods) {
			if (method === 'constructor') continue;

			const originalMethod = target.prototype[method];
			target.prototype[method] = loggerFunction(logger, originalMethod, method);
			Reflect.getMetadataKeys(originalMethod).forEach((key) => {
				const metadata = Reflect.getMetadata(key, originalMethod);
				Reflect.defineMetadata(key, metadata, target.prototype[method]);
			});
		}
	};
}
