import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Res,
	UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
		this.userService
			.create(createUserDto)
			.catch((error) => {
				res.status(400).send(error);
			})
			.then((user) => {
				res.status(201).send(user);
			});
	}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string, @Res() res: Response) {
		this.userService
			.findOne(id)
			.then((user) => res.status(200).send(user))
			.catch((err) => res.status(400).send(err));
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService
			.update(id, updateUserDto)
			.then((res) => {
				if (res.affected > 0) {
					return `Updated: ${id}`;
				} else {
					return `None to update`;
				}
			})
			.catch((err) => console.error(err));
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
