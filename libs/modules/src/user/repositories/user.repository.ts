import { BaseRepository } from '@base/repositories';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository extends BaseRepository<UserEntity> {}
