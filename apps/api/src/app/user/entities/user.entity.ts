import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsUUID } from 'class-validator';
import { List } from '../../todo/list/entities/list.entity';

@Entity()
export class User {
	@Exclude()
	@PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
	id: number;

	@IsUUID()
	@Column({ type: 'uuid', generated: 'uuid', default: () => 'UUID()' })
	uuid: string;

	@Column({ type: 'varchar', length: '26', unique: true })
	username: string;

	@Exclude()
	@Column({ type: 'varchar' })
	password: string;

	@IsEmail()
	@Column({ type: 'varchar', unique: true })
	email: string;

	@Column({ type: 'varchar' })
	firstName: string;

	@Column({ type: 'varchar' })
	lastName: string;

	@Exclude()
	@Column({ type: 'datetime', default: () => 'NOW()' })
	created_at: Date;

	@Exclude()
	@UpdateDateColumn()
	updated_at: Date;

	@Expose()
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	@OneToMany(() => List, (list) => list.user)
	lists: List[];
}
