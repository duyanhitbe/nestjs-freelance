import { BaseTypeormRepository } from '@base/repositories';
import { Repository } from '@core/typeorm';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';
import { UserRepository } from './user.repository';

@Repository(UserTypeormEntity)
export class UserTypeormRepository
	extends BaseTypeormRepository<UserTypeormEntity>
	implements UserRepository {}
