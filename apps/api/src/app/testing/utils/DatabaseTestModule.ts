import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { List } from '../../todo/list/entities/list.entity';
import { ListItem } from '../../todo/list-item/entities/list-item.entity';

export const DatabaseTestModule = () => [
	TypeOrmModule.forRoot({
		type: 'better-sqlite3',
		database: ':memory:',
		dropSchema: true,
		entities: [User, List, ListItem],
		synchronize: true,
	}),
	TypeOrmModule.forFeature([User, List, ListItem]),
];
