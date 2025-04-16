import { TypeormModule } from '@core/typeorm/typeorm.module';
import { UserRepository, UserTypeormEntity, UserTypeormRepository } from '@modules/user';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		TypeormModule.forFeatures({
			entities: [UserTypeormEntity],
			repositories: [
				{
					provide: UserRepository,
					useClass: UserTypeormRepository
				}
			]
		})
	]
})
export class AppRepositoryModule {}
