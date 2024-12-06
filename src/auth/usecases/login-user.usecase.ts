import { Injectable } from '@nestjs/common';
import { LoginUserDto, LoginUserEntity } from '@lib/modules/auth';
import { UserEntity, UserRepository } from '@lib/modules/user';
import { ENUM_TOKEN_ROLE, JwtService } from '@lib/core/jwt';
import { I18nExceptionService } from '@lib/core/i18n';
import { HashService } from '@lib/core/hash';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class LoginUserUseCase extends ExecuteHandler<LoginUserEntity> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
		private readonly i18nExceptionService: I18nExceptionService,
		private readonly hashService: HashService
	) {
		super();
	}

	async execute(data: LoginUserDto): Promise<LoginUserEntity> {
		const { username, password } = data;

		const user = await this.userRepository.findOne({
			where: { username }
		});
		if (!user) {
			this.i18nExceptionService.throwNotFoundEntity(UserEntity.name);
		}

		const comparePassword = await this.hashService.verify(user.password, password);
		if (!comparePassword) {
			this.i18nExceptionService.throwWrongPassword();
		}

		const expiresIn = 60 * 60 * 24;
		const accessToken = await this.jwtService.sign(user.id, ENUM_TOKEN_ROLE.USER, expiresIn);

		return {
			accessToken,
			expiresIn
		};
	}
}
