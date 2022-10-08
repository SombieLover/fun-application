import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { User } from '../../user/entities/user.entity';
import { ListItem } from '../list-item/entities/list-item.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, List, ListItem])],
	controllers: [ListController],
	providers: [ListService],
})
export class ListModule {}
