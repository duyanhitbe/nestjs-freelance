import { HashService } from '@lib/core/hash/hash.service.abstract';
import * as argon2 from 'argon2';

export class Argon2Service extends HashService {
	hash(password: string): Promise<string> {
		return argon2.hash(password);
	}

	verify(hashedPassword: string, password: string): Promise<boolean> {
		return argon2.verify(hashedPassword, password);
	}
}
