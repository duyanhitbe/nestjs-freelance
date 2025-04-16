import { Injectable } from '@nestjs/common';
import { UserEntity, UserRepository } from '@lib/modules/user';
import { ExecuteHandler } from '@lib/base/handlers';

@Injectable()
export class DeleteUserUseCase extends ExecuteHandler<UserEntity> {
	constructor(private readonly userRepository: UserRepository) {
		super();
	}

	async execute(id: string): Promise<UserEntity> {
		return this.userRepository.softDeleteById({ id });
	}
}
