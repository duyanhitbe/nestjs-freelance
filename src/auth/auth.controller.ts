import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { SwaggerOkResponse, UseAuth, User } from '@lib/common/decorators';
import { LoginUserDto, LoginUserEntity } from '@lib/modules/auth';
import { LoginUserUseCase } from './usecases/login-user.usecase';
import { Request, Response } from 'express';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';
import { RequestUser } from '@lib/common/interfaces';
import { UserEntity } from '@lib/modules/user';
import { DetailUserUseCase } from '../user/usecases/detail-user.usecase';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly loginUserUseCase: LoginUserUseCase,
		private readonly detailUserUseCase: DetailUserUseCase
	) {}

	/**
	 * @path POST /api/v1/auth/user/login
	 * @param data {LoginUserDto}
	 * @returns Promise<LoginUserEntity>
	 */
	@Post('user/login')
	@HttpCode(200)
	@SwaggerOkResponse({ summary: 'Login user', type: LoginUserEntity })
	loginUser(@Body() data: LoginUserDto): Promise<LoginUserEntity> {
		return this.loginUserUseCase.execute(data);
	}

	/**
	 * @path POST /api/v1/auth/logout
	 * @returns Promise<void>
	 */
	@UseAuth()
	@Post('logout')
	@HttpCode(200)
	@SwaggerOkResponse({ summary: 'Logout', type: String })
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		req.session.destroy(() => {});
		res.clearCookie('session');
		return 'success';
	}

	/**
	 * @path GET /api/v1/auth/user
	 * @returns Promise<UserEntity>
	 */
	@UseAuth({ roles: [ENUM_TOKEN_ROLE.USER] })
	@Get('user')
	@SwaggerOkResponse({ summary: 'Get user info', type: UserEntity })
	async getUserInfo(@User() user: RequestUser) {
		return this.detailUserUseCase.query(user!.id);
	}
}
