import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { TranslateService } from '@lib/core/i18n/i18n.service';

@Injectable()
export class TranslateServiceImp extends TranslateService {
	constructor(private readonly i18nService: I18nService) {
		super();
	}

	entityName(entityName: string) {
		return this.i18nService.translate(`entity.${entityName}`);
	}

	field(field: string) {
		return this.i18nService.translate(`field.${field}`);
	}

	notExistsMessage(property: string) {
		return this.i18nService.translate('validation.NOT_EXISTS', {
			args: {
				property
			}
		});
	}

	existsMessage(property: string) {
		return this.i18nService.translate('validation.EXISTS', {
			args: {
				property
			}
		});
	}

	wrongPasswordMessage(): string {
		return this.i18nService.translate('auth.WRONG_PASSWORD');
	}

	missingAuthorizationMessage(): string {
		return this.i18nService.translate('auth.MISSING_AUTHORIZATION');
	}

	invalidAuthorizationMessage(): string {
		return this.i18nService.translate('auth.INVALID_AUTHORIZATION');
	}
}
