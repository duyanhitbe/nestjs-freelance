import { ExecuteHandler } from '@base/handlers';
import { UserEntity, UserRepository } from '@modules/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase extends ExecuteHandler<UserEntity> {
	constructor(private readonly userRepository: UserRepository) {
		super();
	}

	async execute(id: string): Promise<UserEntity> {
		return this.userRepository.softDeleteById({ id });
	}
}
