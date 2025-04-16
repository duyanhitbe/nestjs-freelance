import { ENUM_STATUS } from '@base/enums/status.enum';
import { camelToSnake } from '@common/helpers';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity as TypeormBaseEntity,
	UpdateDateColumn
} from 'typeorm';
import { BaseEntity } from './entity.base';

export class BaseTypeormEntity extends TypeormBaseEntity implements BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@CreateDateColumn({ name: camelToSnake('createdAt'), type: 'timestamptz' })
	createdAt!: Date;

	@UpdateDateColumn({ name: camelToSnake('updatedAt'), type: 'timestamptz' })
	updatedAt!: Date;

	@DeleteDateColumn({ name: camelToSnake('deletedAt'), type: 'timestamptz', select: false })
	deletedAt!: Date;

	@Column({
		type: 'simple-enum',
		enum: ENUM_STATUS,
		enumName: 'ENUM_STATUS',
		default: ENUM_STATUS.ACTIVE
	})
	status!: ENUM_STATUS;
}
