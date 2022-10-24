import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JWT } from '../../constants';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategyService } from './jwt.strategy/jwt.strategy.service';
import { UserRepository } from './repositories/users.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserRepository]),
		PassportModule,
		JwtModule.register({
			secret: JWT.SECRET,
			signOptions: { expiresIn: JWT.ACCESS_EXPIRESIN },
		}),
	],
	controllers: [AuthenticationController],
	providers: [JwtStrategyService, AuthenticationService],
})
export class AuthenticationModule {}
