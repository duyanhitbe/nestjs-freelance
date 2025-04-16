import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserEntity, UserRepository } from '@lib/modules/user';
import { I18nExceptionService, TranslateService } from '@lib/core/i18n';
import { ExecuteHandler } from '@lib/base/handlers';

@Injectable()
export class CreateUserUseCase extends ExecuteHandler<UserEntity> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly translateService: TranslateService,
		private readonly i18nExceptionService: I18nExceptionService
	) {
		super();
	}

	async execute(data: CreateUserDto): Promise<UserEntity> {
		const exists = await this.userRepository.exists({
			where: {
				username: data.username
			}
		});
		if (exists) {
			const property = this.translateService.field('USERNAME');
			this.i18nExceptionService.throwExists(property);
		}

		return this.userRepository.create({ data });
	}
}
