import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT } from '../../../constants';
import { IUser } from '../authentication.interface';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
	constructor(@Inject(CACHE_MANAGER) private readonly _cacheService: Cache) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT.SECRET,
		});
	}

	async validate(payload: IUser) {
		const accessTokenKey = `access:${payload?.id ?? ''}`;

		const accessKey = await this._cacheService.store.get(accessTokenKey);

		if (accessKey) return;

		return payload;
	}
}
