import { BaseTypeormEntity } from '@base/entities';
import { TypeormColumn, TypeormUnique } from '@common/decorators';
import { Argon2Service } from '@core/hash';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Entity } from 'typeorm';
import { UserEntity } from './user.entity';

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
