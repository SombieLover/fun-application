import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { DatabaseTestModule } from '../testing/utils/DatabaseTestModule';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { of } from 'rxjs';
import { hashSync } from 'bcrypt';

describe('UserService', () => {
	let service: UserService;
	let mockUserRepo: Repository<User>;
	const createUser = (user?: CreateUserDto) => {
		let returnUser: User;
		Object.keys(user).forEach((key) => {
			returnUser[key] = user[key];
		});
		return returnUser;
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [...DatabaseTestModule()],
			providers: [UserService],
		}).compile();

		service = module.get<UserService>(UserService);
		mockUserRepo = module.get<Repository<User>>(Repository<User>);
	});
	it('should have service', (done) => {
		expect(service).toBeDefined();
		done();
	});

	describe('When the database is empty', () => {
		beforeEach(() => {
			const users: User[] = [
				createUser({
					firstName: 'Test',
					lastName: 'User',
					email: 'testuser@example.com',
					password: hashSync('password', 10),
					password_confirmation: hashSync('password', 10),
					username: 'testuser',
				}),
			];
			jest.spyOn(mockUserRepo, 'find').mockReturnValue(of(users).toPromise());
		});
		it('should return no users', (done) => {
			service.findAll().then((users) => {
				expect(users).toHaveLength(0);
				done();
			});
		});
	});

	// TODO: Write Test for Creating User
	// TODO: Write Test for Upating User
	// TODO: Write Test for Deleting User
	// TODO: Write Test for Retrieving Users
	// TODO: Write Test for Retrieving User
});
