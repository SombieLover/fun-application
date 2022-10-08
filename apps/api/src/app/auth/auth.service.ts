import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepo: Repository<User>,
		private jwtService: JwtService
	) {}

	async validate(login: { username: string; password: string }) {
		const user = await this.userRepo.findOneByOrFail({
			username: login.username,
		});
		return compareSync(login.password, user.password) ? user : null;
	}

	generateToken(payload) {
		return this.jwtService.sign(payload);
	}
}
