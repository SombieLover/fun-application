import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../list/entities/list.entity';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { UpdateListItemDto } from './dto/update-list-item.dto';
import { ListItem } from './entities/list-item.entity';

@Injectable()
export class ListItemService {
	constructor(
		@InjectRepository(ListItem) private listItemRepo: Repository<ListItem>,
		@InjectRepository(List) private listRepo: Repository<List>
	) {}

	async create(createListItemDto: CreateListItemDto) {
		const { listId, ...listItem } = createListItemDto;
		const list = await this.listRepo.findOneBy({ uuid: listId });
		const createdListItem = this.listItemRepo.create({
			...listItem,
			list: { id: list.id },
		});
		return this.listItemRepo.save(createdListItem);
	}

	findAll() {
		return this.listItemRepo.find({ relations: { list: { user: true } } });
	}

	findOne(uuid: string) {
		return this.listItemRepo.findOneOrFail({
			where: { uuid },
			relations: { list: { user: true } },
		});
	}

	update(uuid: string, updateListItemDto: UpdateListItemDto) {
		return this.listItemRepo.update({ uuid }, updateListItemDto).then(() => {
			return this.listItemRepo.findOne({
				where: { uuid },
				relations: { list: { user: true } },
			});
		});
	}

	remove(uuid: string) {
		return this.listItemRepo.delete({ uuid }).then((res) => {
			return res.affected > 0 ? `Deleted: ${uuid}` : `No item to delete`;
		});
	}
}
