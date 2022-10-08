import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request) => {
					const token = request.cookies['authToken'];
					if (!token) {
						return false;
					} else return token;
				},
			]),
			ingoreExpiration: false,
			secretOrKey: process.env.SESSION_SECRET,
		});
	}

	async validate(payload: any) {
		return payload;
	}
}
