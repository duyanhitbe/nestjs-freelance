import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { FindUserUseCase } from './usecases/find-user.usecase';
import { DetailUserUseCase } from './usecases/detail-user.usecase';

@Module({
	controllers: [UserController],
	providers: [
		CreateUserUseCase,
		UpdateUserUseCase,
		DeleteUserUseCase,
		FindUserUseCase,
		DetailUserUseCase
	],
	exports: [DetailUserUseCase]
})
export class UserModule {}
