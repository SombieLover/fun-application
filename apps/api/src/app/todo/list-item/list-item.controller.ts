import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	ClassSerializerInterceptor,
} from '@nestjs/common';
import { ListItemService } from './list-item.service';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { UpdateListItemDto } from './dto/update-list-item.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('list-item')
export class ListItemController {
	constructor(private readonly listItemService: ListItemService) {}

	@Post()
	create(@Body() createListItemDto: CreateListItemDto) {
		console.log(createListItemDto);
		return this.listItemService.create(createListItemDto);
	}

	@Get()
	findAll() {
		return this.listItemService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.listItemService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateListItemDto: UpdateListItemDto) {
		return this.listItemService.update(id, updateListItemDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.listItemService.remove(id);
	}
}
