import { UserEntity } from './user.entity';
import { BaseTypeormEntity } from '@lib/base/entities';
import { BeforeInsert, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { TypeormColumn, TypeormUnique } from '@lib/common/decorators';
import { Argon2Service } from '@lib/core/hash';

@Entity('users')
export class UserTypeormEntity extends BaseTypeormEntity implements UserEntity {
	@TypeormUnique()
	@TypeormColumn()
	username!: string;

	@TypeormColumn()
	@Exclude()
	password!: string;

	@BeforeInsert()
	async beforeInsert() {
		const hashService = new Argon2Service();
		this.password = await hashService.hash(this.password);
	}
}
