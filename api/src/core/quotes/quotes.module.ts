import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { QuotesRepository } from './respositories/quotes.repository';

@Module({
	imports: [TypeOrmModule.forFeature([QuotesRepository])],
	controllers: [QuotesController],
	providers: [QuotesService],
})
export class QuotesModule {}
