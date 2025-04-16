export abstract class HashService {
	abstract hash(password: string): Promise<string>;

	abstract verify(hashedPassword: string, password: string): Promise<boolean>;
}
