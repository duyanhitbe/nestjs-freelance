export abstract class I18nExceptionService {
	abstract throwExists(property: string): never;

	abstract throwNotFoundEntity(entityName: string): never;

	abstract throwWrongPassword(): never;

	abstract throwMissingAuthorization(): never;

	abstract throwInvalidAuthorization(): never;
}

export abstract class TranslateService {
	abstract entityName(entityName: string): string;

	abstract field(field: string): string;

	abstract notExistsMessage(property: string): string;

	abstract existsMessage(property: string): string;

	abstract wrongPasswordMessage(): string;

	abstract missingAuthorizationMessage(): string;

	abstract invalidAuthorizationMessage(): string;
}
