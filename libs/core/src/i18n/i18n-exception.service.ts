import { I18nExceptionService, TranslateService } from '@core/i18n/i18n.service';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';

@Injectable()
export class I18nExceptionServiceImp extends I18nExceptionService {
	constructor(private readonly translateService: TranslateService) {
		super();
	}

	throwExists(property: string): never {
		const message = this.translateService.existsMessage(property);
		throw new ConflictException(message);
	}

	throwNotFoundEntity(entityName: string): never {
		const translatedEntityName = this.translateService.entityName(entityName);
		const message = this.translateService.notExistsMessage(translatedEntityName);
		throw new NotFoundException(message);
	}

	throwWrongPassword(): never {
		const message = this.translateService.wrongPasswordMessage();
		throw new BadRequestException(message);
	}

	throwMissingAuthorization(): never {
		const message = this.translateService.missingAuthorizationMessage();
		throw new UnauthorizedException(message);
	}

	throwInvalidAuthorization(): never {
		const message = this.translateService.invalidAuthorizationMessage();
		throw new UnauthorizedException(message);
	}
}
