import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto, FilterUserDto, UpdateUserDto, UserEntity } from '@lib/modules/user';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { FindUserUseCase } from './usecases/find-user.usecase';
import { DetailUserUseCase } from './usecases/detail-user.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';

@Controller('users')
@UseAuth()
export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly updateUserUseCase: UpdateUserUseCase,
		private readonly deleteUserUseCase: DeleteUserUseCase,
		private readonly findUserUseCase: FindUserUseCase,
		private readonly detailUserUseCase: DetailUserUseCase
	) {}

	/**
	 * @path POST /api/v1/users
	 * @param data {CreateUserDto}
	 * @returns {Promise<UserEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create user', type: UserEntity })
	create(@Body() data: CreateUserDto): Promise<UserEntity> {
		return this.createUserUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/users/:id
	 * @param id {string}
	 * @param data {UpdateUserDto}
	 * @returns {Promise<UserEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update user', type: UserEntity })
	update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<UserEntity> {
		return this.updateUserUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/users/:id
	 * @param id {string}
	 * @returns {Promise<UserEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove user', type: UserEntity })
	remove(@Param('id') id: string): Promise<UserEntity> {
		return this.deleteUserUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/users
	 * @param filter {FilterUserDto}
	 * @returns {Promise<PaginationResponse<UserEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List user', type: UserEntity })
	findAll(@Query() filter: FilterUserDto): Promise<PaginationResponse<UserEntity>> {
		return this.findUserUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/users/:id
	 * @param id {string}
	 * @returns {Promise<UserEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail user', type: UserEntity })
	findOne(@Param('id') id: string): Promise<UserEntity> {
		return this.detailUserUseCase.query(id);
	}
}
