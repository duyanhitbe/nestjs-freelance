import { BaseRepository } from '@lib/base/repositories';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository extends BaseRepository<UserEntity> {}
