import { Exclude } from 'class-transformer';
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { ListItem } from '../../list-item/entities/list-item.entity';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class List {
	@Exclude()
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Column({ type: 'uuid', generated: 'uuid', default: () => 'UUID()' })
	uuid: string;

	@Column({ type: 'varchar' })
	listName: string;

	@ManyToOne(() => User, (user) => user.lists)
	user: User;

	@OneToMany(() => ListItem, (item) => item.list)
	items: ListItem[];
}
