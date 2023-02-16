import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Dealer extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	фамилия: string;

	@Column()
	имя: string;

	@Column()
	отчество: string;

	@Column()
	фотография: string;

	@Column()
	адрес: string;

	@Column()
	телефон: string;
}