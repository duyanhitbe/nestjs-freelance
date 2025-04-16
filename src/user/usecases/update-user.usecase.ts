import { ExecuteHandler } from '@base/handlers';
import { UpdateUserDto, UserEntity, UserRepository } from '@modules/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserUseCase extends ExecuteHandler<UserEntity> {
	constructor(private readonly userRepository: UserRepository) {
		super();
	}

	async execute(id: string, data: UpdateUserDto): Promise<UserEntity> {
		return this.userRepository.updateById({ id, data });
	}
}
