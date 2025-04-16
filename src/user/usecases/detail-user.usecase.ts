import { Injectable } from '@nestjs/common';
import { UserEntity, UserRepository } from '@lib/modules/user';
import { QueryHandler } from '@lib/base/handlers';

@Injectable()
export class DetailUserUseCase extends QueryHandler<UserEntity> {
	constructor(private readonly userRepository: UserRepository) {
		super();
	}

	async query(id: string): Promise<UserEntity> {
		return this.userRepository.findByIdOrThrow({ id });
	}
}
