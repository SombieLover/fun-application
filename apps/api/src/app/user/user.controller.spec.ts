import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseTestModule } from '../testing/utils/DatabaseTestModule';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [...DatabaseTestModule()],
			controllers: [UserController],
			providers: [UserService],
		}).compile();

		controller = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
