import { ClassSerializerInterceptor } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../../list/entities/list.entity';

@Entity()
export class ListItem {
	@Exclude()
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Column({ type: 'uuid', generated: 'uuid', default: () => 'UUID()' })
	uuid: string;

	@Column({ type: 'varchar' })
	itemName: string;

	@Column({ type: 'boolean', default: false })
	complete: boolean;

	@ManyToOne(() => List, (list) => list.items)
	list: List;
}
