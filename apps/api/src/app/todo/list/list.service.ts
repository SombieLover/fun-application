import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
	constructor(
		@InjectRepository(List) private listRepo: Repository<List>,
		@InjectRepository(User) private userRepo: Repository<User>
	) {}

	async create(createListDto: CreateListDto, userUUID?) {
		let list;
		if (createListDto.user) {
			const queriedUser = await this.userRepo.findOneBy({
				uuid: String(createListDto.user),
			});
			const { user, ...lst } = createListDto;
			list = this.listRepo.create({ ...lst, user: queriedUser });
		} else {
			const queriedUser = await this.userRepo.findOneBy({
				uuid: String(userUUID),
			});
			list = this.listRepo.create({
				...createListDto,
				user: queriedUser,
				items: [],
			});
		}
		return await this.listRepo.save(list);
	}

	findAll() {
		return this.listRepo.find({ relations: { items: true, user: true } });
	}

	findOne(uuid: string) {
		return this.listRepo.findOneOrFail({
			where: { uuid },
			relations: { items: true, user: true },
		});
	}

	async update(uuid: string, updateListDto: UpdateListDto) {
		let returnedList;
		let results;
		if (updateListDto.user) {
			const { user, ...list } = updateListDto;
			returnedList = list;
			const queriedUser = await this.userRepo.findOneBy({ uuid: user.toString() });
			results = await this.listRepo.update(
				{ uuid },
				{
					...list,
					user: {
						id: queriedUser.id,
					},
				}
			);
		} else {
			results = await this.listRepo.update(
				{ uuid },
				returnedList || updateListDto
			);
		}
		return results.affected > 0
			? this.listRepo.findOne({
					where: { uuid },
					relations: {
						user: true,
						items: true,
					},
			  })
			: new NotFoundException();
	}

	remove(uuid: string) {
		return this.listRepo.delete({ uuid });
	}
}
