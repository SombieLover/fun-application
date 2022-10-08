import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
	salt: string;
	constructor(@InjectRepository(User) private userRepo: Repository<User>) {
		this.salt = genSaltSync(13);
	}

	create(createUserDto: CreateUserDto) {
		const { password, password_confirmation, ...user } = createUserDto;
		if (password != password_confirmation) {
			throw BadRequestException;
		}

		const hashedPassword = hashSync(password, this.salt);
		return this.userRepo.save({ ...user, password: hashedPassword });
	}

	findAll() {
		return this.userRepo.find();
	}

	findOne(uuid: string) {
		return this.userRepo.findOneByOrFail({ uuid });
	}

	update(uuid: string, updateUserDto: UpdateUserDto) {
		if (updateUserDto.password) {
			updateUserDto.password = hashSync(updateUserDto.password, this.salt);
		}
		return this.userRepo.update({ uuid }, updateUserDto);
	}

	remove(uuid: string) {
		return this.userRepo.delete({ uuid });
	}
}
