import { ListItem } from '../entities/list-item.entity';

export class CreateListItemDto {
	itemName: string;
	complete?: boolean;
	listId: string;
}
