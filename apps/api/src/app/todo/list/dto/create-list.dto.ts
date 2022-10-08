import { ListItem } from '../../list-item/entities/list-item.entity';
import { User } from '../../../user/entities/user.entity';

export class CreateListDto {
	listName: string;
	user?: User | string;
}
