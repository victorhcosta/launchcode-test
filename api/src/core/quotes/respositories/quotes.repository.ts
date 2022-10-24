import { EntityRepository, Repository } from 'typeorm';

import { Quotes } from '../entities/quote.entity';

@EntityRepository(Quotes)
export class QuotesRepository extends Repository<Quotes> {}
