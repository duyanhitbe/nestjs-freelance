import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService as NestJwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtService } from '@lib/core/jwt/jwt.service';
import { JwtPayload } from './jwt.type';
import { ConfigService } from '@nestjs/config';
import { Env } from '@lib/common/interfaces';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt/jwt.enum';

@Injectable()
export class JwtServiceImp extends JwtService {
	constructor(
		private readonly jwtService: NestJwtService,
		private readonly configService: ConfigService<Env>
	) {
		super();
	}

	private get secret(): string {
		const secret = this.configService.get<string>('JWT_SECRET');

		if (!secret) {
			throw new InternalServerErrorException('Jwt secret is required');
		}

		return secret;
	}

	async sign(sub: string, role: ENUM_TOKEN_ROLE, expiresIn: number): Promise<string> {
		const payload = { sub, role };
		const options: JwtSignOptions = { secret: this.secret, expiresIn };
		return this.jwtService.signAsync(payload, options);
	}

	async verify(token: string): Promise<JwtPayload> {
		const options: JwtVerifyOptions = { secret: this.secret };
		return this.jwtService.verifyAsync<JwtPayload>(token, options);
	}

	async decode(token: string): Promise<JwtPayload> {
		return this.jwtService.decode<JwtPayload>(token);
	}
}
