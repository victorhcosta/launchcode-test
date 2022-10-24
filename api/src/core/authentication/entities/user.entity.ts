import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { IUser } from '../authentication.interface';

@Entity()
export class Users implements IUser {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { nullable: false })
	name: string;

	@Column('varchar', { nullable: false })
	surname: string;

	@Column('varchar', { nullable: false, unique: true })
	username: string;

	@Column('varchar', { nullable: false, select: false })
	password?: string;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	createdAt: Date;
}
