import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { QuotesRepository } from './respositories/quotes.repository';
import { IQuote } from './quotes.interface';

@Injectable()
export class QuotesService {
	constructor(private readonly _quotesRepository: QuotesRepository) {}

	async getQuotes(): Promise<IQuote[]> {
		const quotes = await this._quotesRepository.find();

		return quotes;
	}

	async createQuote(quote: IQuote) {
		if (!quote.departure)
			throw new HttpException(
				'Departure is required to create a new quote',
				HttpStatus.BAD_REQUEST,
			);

		if (!quote.destination)
			throw new HttpException(
				'Destionation is required to create a new quote',
				HttpStatus.BAD_REQUEST,
			);

		if (!quote.startTravelDate)
			throw new HttpException(
				'Start travel date is required to create a new quote',
				HttpStatus.BAD_REQUEST,
			);

		if (!quote.endTravelDate)
			throw new HttpException(
				'End travel date is required to create a new quote',
				HttpStatus.BAD_REQUEST,
			);

		if (!quote.transportation)
			throw new HttpException(
				'Transportation is required to create a new quote',
				HttpStatus.BAD_REQUEST,
			);

		if (!quote.name)
			throw new HttpException(
				'Client name is required to create a new quote',
				HttpStatus.BAD_REQUEST,
			);

		if (!quote.quantityOfClients || quote.quantityOfClients < 1)
			throw new HttpException(
				'It`s required one or more clients to create a new quote',
				HttpStatus.BAD_REQUEST,
			);

		if (!quote.price || quote.price < 1)
			throw new HttpException(
				'It`s required the price to create a new quote, and the price can not be smaller than $1',
				HttpStatus.BAD_REQUEST,
			);

		await this._quotesRepository.save(quote);
	}
}
