import { ExecuteHandler } from '@base/handlers';
import { HashService } from '@core/hash';
import { I18nExceptionService } from '@core/i18n';
import { ENUM_TOKEN_ROLE, JwtService } from '@core/jwt';
import { LoginUserDto, LoginUserEntity } from '@modules/auth';
import { UserEntity, UserRepository } from '@modules/user';
import { Injectable } from '@nestjs/common';

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
