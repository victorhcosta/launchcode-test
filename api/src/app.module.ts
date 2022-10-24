import { CacheModule, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { TYPEORM, RATELIMIT, TIME_IN_SECONDS } from './constants';
import { AuthenticationModule } from './core/authentication/authentication.module';
import { QuotesModule } from './core/quotes/quotes.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			autoLoadEntities: true,
			username: TYPEORM.USER,
			password: TYPEORM.PASS,
			host: TYPEORM.HOST,
			port: TYPEORM.PORT,
			database: TYPEORM.DB,
			entities: [TYPEORM.ENTITIES],
		}),
		CacheModule.register({ isGlobal: true, ttl: TIME_IN_SECONDS.ONE_DAY }),
		ThrottlerModule.forRoot({
			ttl: RATELIMIT.TTL,
			limit: RATELIMIT.LIMIT,
		}),
		AuthenticationModule,
		QuotesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
