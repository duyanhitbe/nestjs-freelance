import { QueryHandler } from '@base/handlers';
import { UserEntity, UserRepository } from '@modules/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DetailUserUseCase extends QueryHandler<UserEntity> {
	constructor(private readonly userRepository: UserRepository) {
		super();
	}

	async query(id: string): Promise<UserEntity> {
		return this.userRepository.findByIdOrThrow({ id });
	}
}
