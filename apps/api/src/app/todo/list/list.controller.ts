import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req,
	UseInterceptors,
	ClassSerializerInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('list')
export class ListController {
	constructor(private readonly listService: ListService) {}

	@Post()
	create(@Body() createListDto: CreateListDto, @Req() req: Request) {
		return this.listService.create(createListDto, req.user);
	}

	@Get()
	findAll() {
		return this.listService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.listService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
		return this.listService.update(id, updateListDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.listService.remove(id);
	}
}
