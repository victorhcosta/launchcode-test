import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { IQuote } from '../quotes.interface';

@Entity()
export class Quotes implements IQuote {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { nullable: false })
	departure: string;

	@Column('varchar', { nullable: false })
	destination: string;

	@Column('varchar', { nullable: false })
	startTravelDate: Date;

	@Column('varchar', { nullable: false })
	endTravelDate: Date;

	@Column('varchar', { nullable: false })
	transportation: string;

	@Column('varchar', { nullable: false })
	name: string;

	@Column('integer', { nullable: false, default: 0 })
	quantityOfClients: number;

	@Column('float', { nullable: false, default: 0 })
	price: number;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	createdAt: Date;
}
