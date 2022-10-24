import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compareSync } from 'bcrypt';
import { Cache } from 'cache-manager';

import { JWT } from '../../constants';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly _jwtService: JwtService,
		private readonly _usersRepository: UserRepository,
		@Inject(CACHE_MANAGER) private readonly _cacheService: Cache,
	) {}

	async generateToken(username: string, password: string) {
		const user = await this._usersRepository.finndByUsernameWithPassword(
			username,
		);

		const isCorrectPassword = compareSync(password, user?.password ?? '');

		if (!isCorrectPassword)
			throw new Error('Your password or username is wrong.');

		delete user?.password;

		const access_token = this._jwtService.sign(
			{ ...user },
			{ expiresIn: JWT.ACCESS_EXPIRESIN },
		);

		return {
			access_token,
		};
	}

	async logout(accessToken: string): Promise<void> {
		const token = accessToken.split('Bearer ')[1];

		const accessTokenDecoded = this._jwtService.decode(token) as any;

		const accessTokenKey = `access:${accessTokenDecoded?.id ?? ''}`;

		this._cacheService.set(
			accessTokenKey,
			accessTokenDecoded?.username ?? '',
		);

		return;
	}
}
