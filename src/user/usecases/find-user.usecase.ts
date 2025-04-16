import { Injectable } from '@nestjs/common';
import { FilterUserDto, UserEntity, UserRepository } from '@lib/modules/user';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/base/handlers';

@Injectable()
export class FindUserUseCase extends QueryHandler<PaginationResponse<UserEntity>> {
	constructor(private readonly userRepository: UserRepository) {
		super();
	}

	async query(filter: FilterUserDto): Promise<PaginationResponse<UserEntity>> {
		return this.userRepository.findPaginated(filter);
	}
}
