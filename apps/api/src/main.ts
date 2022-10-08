/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import * as cookie from 'cookie-parser';
import helmet from 'helmet';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';

const second = 1000;
const minute = second * 60;
const hour = minute * 60;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: {
			origin: [process.env.APP_DOMAIN],
		},
	});
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	const port = process.env.PORT || 3333;
	app.use(cookie());
	app.use(
		helmet({
			ieNoOpen: true,
			hidePoweredBy: true,
		})
	);
	app.use(
		session({
			cookie: {
				maxAge: 3 * hour,
				signed: true,
			},
			secret: process.env.SESSION_SECRET,
			resave: true,
			saveUninitialized: false,
		})
	);

	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://${process.env.APP_DOMAIN}:${port}/${globalPrefix}`
	);
}

bootstrap();
