import { CacheModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { JWT } from '../../../constants';
import { mockUser } from '../../../shared/mocks/user.mock';
import { JwtStrategyService } from './jwt.strategy.service';

describe('JwtStrategyService', () => {
	let service: JwtStrategyService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JwtModule.register({
					secret: JWT.SECRET,
					signOptions: { expiresIn: JWT.ACCESS_EXPIRESIN },
				}),
				CacheModule.register(),
			],
			providers: [JwtStrategyService],
		}).compile();

		service = module.get<JwtStrategyService>(JwtStrategyService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return the user', async () => {
		const result = await service.validate(mockUser);

		expect(result).toBeDefined();
	});

	it.skip('should return false when the user is in the cache', () => {
		return;
	});
});
