import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Body,
	Headers,
} from '@nestjs/common';

import { AuthenticationService } from './authentication.service';

@Controller('')
export class AuthenticationController {
	constructor(private readonly _authService: AuthenticationService) {}

	@Post('/login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() body) {
		const { username, password } = body;
		const token = await this._authService.generateToken(username, password);

		return token;
	}

	@Post('/logout')
	@HttpCode(HttpStatus.NO_CONTENT)
	async logout(@Headers('Authorization') accessToken: string) {
		await this._authService.logout(accessToken);
	}
}
