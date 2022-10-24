import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticateJWTGuard extends AuthGuard('jwt') {
	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handleRequest(err: any, user: any, _info: any, _context: ExecutionContext) {
		if (err || !user)
			throw (
				err ||
				new UnauthorizedException(
					'Unauthorized, you should login to make it',
				)
			);

		return user;
	}
}
