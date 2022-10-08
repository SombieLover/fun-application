import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

// Entities
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ListModule } from './todo/list/list.module';
import { ListItemModule } from './todo/list-item/list-item.module';
import { List } from './todo/list/entities/list.entity';
import { ListItem } from './todo/list-item/entities/list-item.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			database: process.env.DB_DATABASE,
			host: process.env.DB_HOST,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			type: 'mariadb',
			entities: [User, List, ListItem],
			synchronize: process.env.APP_ENV == 'production' ? false : true,
		}),
		UserModule,
		AuthModule,
		ListModule,
		ListItemModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
