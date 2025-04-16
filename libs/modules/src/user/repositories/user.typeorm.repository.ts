import { UserRepository } from './user.repository';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';

@Repository(UserTypeormEntity)
export class UserTypeormRepository
	extends BaseTypeormRepository<UserTypeormEntity>
	implements UserRepository {}
