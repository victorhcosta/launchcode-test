import { CacheModule } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthenticateJWTGuard } from './authenticate-jwt.guard';

describe.skip('AuthenticateJWTGuard', () => {
	let guard: AuthenticateJWTGuard;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [CacheModule.register()],
		}).compile();

		guard = module.get<AuthenticateJWTGuard>(AuthenticateJWTGuard);
	});
	it('should be defined', () => {
		expect(guard).toBeDefined();
	});
});
