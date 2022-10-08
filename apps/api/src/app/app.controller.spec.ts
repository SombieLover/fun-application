import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { ListItemModule } from './list-item/list-item.module';

describe('AppController', () => {
	let app: TestingModule;
	let appService: AppService;
	let appController: AppController;

	beforeAll(async () => {
		app = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		appService = app.get<AppService>(AppService);
		appController = app.get<AppController>(AppController);
	});

	describe('When calling app controller', () => {
		beforeEach(() => {
			jest.spyOn(appService, 'getData').mockImplementation(() => {
				return { message: 'Test Message' };
			});
		});

		it('Should return the test message', (done) => {
			expect(appController.getData()).toStrictEqual({ message: 'Test Message' });
			done();
		});
	});
});
