import { JwtPayload } from './jwt.type';
import { ENUM_TOKEN_ROLE } from './jwt.enum';

export abstract class JwtService {
	abstract sign(sub: string, role: ENUM_TOKEN_ROLE, expiresIn: number): Promise<string>;

	abstract verify(token: string): Promise<JwtPayload>;

	abstract decode(token: string): Promise<JwtPayload>;
}
