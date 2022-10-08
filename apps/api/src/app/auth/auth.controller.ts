import { Controller, Post, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	login(@Req() req: Request, @Res() res: Response) {
		res
			.status(200)
			.cookie('authToken', this.authService.generateToken(req.user))
			.send();
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('validate')
	validate(@Req() req: Request) {
		return req.user;
	}
}
