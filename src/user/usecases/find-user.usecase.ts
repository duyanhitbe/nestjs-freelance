import { PaginationResponse } from '@base/dto';
import { QueryHandler } from '@base/handlers';
import { FilterUserDto, UserEntity, UserRepository } from '@modules/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserUseCase extends QueryHandler<PaginationResponse<UserEntity>> {
	constructor(private readonly userRepository: UserRepository) {
		super();
	}

	async query(filter: FilterUserDto): Promise<PaginationResponse<UserEntity>> {
		return this.userRepository.findPaginated(filter);
	}
}
