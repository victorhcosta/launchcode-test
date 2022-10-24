import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common';

import { AuthenticateJWTGuard } from '../../shared/guards/authenticate-jwt.guard';
import { IQuote } from './quotes.interface';
import { QuotesService } from './quotes.service';

@Controller('quotes')
@UseGuards(AuthenticateJWTGuard)
export class QuotesController {
	constructor(private readonly _quotesService: QuotesService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getQuotes() {
		const quotes = await this._quotesService.getQuotes();

		return quotes;
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createQuote(@Body() body: IQuote) {
		await this._quotesService.createQuote(body);
	}
}
