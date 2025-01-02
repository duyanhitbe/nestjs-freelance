import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUserUseCase } from './usecases/login-user.usecase';
import { UserModule } from '../user/user.module';

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [LoginUserUseCase]
})
export class AuthModule {}
