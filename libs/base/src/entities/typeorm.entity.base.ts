import { BaseEntity } from './entity.base.abstract';
import {
	BaseEntity as TypeormBaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { camelToSnake } from '@lib/common/helpers';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';

export class BaseTypeormEntity extends TypeormBaseEntity implements BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@CreateDateColumn({ name: camelToSnake('createdAt'), type: 'timestamptz' })
	createdAt!: Date;

	@UpdateDateColumn({ name: camelToSnake('updatedAt'), type: 'timestamptz' })
	updatedAt!: Date;

	@DeleteDateColumn({ name: camelToSnake('deletedAt'), type: 'timestamptz', select: false })
	deletedAt?: Date;

	@Column({
		type: 'simple-enum',
		enum: ENUM_STATUS,
		enumName: 'ENUM_STATUS',
		default: ENUM_STATUS.ACTIVE
	})
	status!: ENUM_STATUS;
}
