import { getConnection } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { List } from '../../todo/list/entities/list.entity';
import { ListItem } from '../../todo/list-item/entities/list-item.entity';
import { hashSync } from 'bcrypt';

export const DatabaseTestSeed = async () => {
	const connection = getConnection();
	const entityManager = connection.createEntityManager();
	// Create User
	entityManager.insert<User>(User, {
		firstName: 'Brian',
		lastName: 'Martin',
		email: 'brianmartin@gmail.com',
		password: hashSync('password', 13),
		username: 'brianmartin',
	});
	// Create List
	entityManager.insert<List>(List, {
		user: {
			id: 1,
		},
		listName: 'Test List',
	});
	// Create List Items
	entityManager.insert<ListItem>(ListItem, {
		list: {
			id: 1,
		},
		complete: false,
		itemName: 'Clean Desk',
	});
	entityManager.insert<ListItem>(ListItem, {
		list: {
			id: 1,
		},
		complete: false,
		itemName: 'Organize Desktop',
	});
	entityManager.insert<ListItem>(ListItem, {
		list: {
			id: 1,
		},
		complete: false,
		itemName: 'Drink Water',
	});
};
