import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { ENV, ORIGIN, PORT } from './constants';
import { HttpExceptionFilter } from './shared/exceptions/http-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: ORIGIN,
		},
		bodyParser: true,
	});

	app.useGlobalFilters(new HttpExceptionFilter());

	if (ENV !== 'PRODUCTION') {
		const config = new DocumentBuilder()
			.setTitle('Quaestio APIs')
			.setVersion('1.0')
			.setContact('Victor Costa', '', 'victor.v.h.o.c@outlook.com')
			.addBearerAuth(
				{
					type: 'http',
					name: 'Bearer',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
				'Authorization',
			)
			.build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api', app, document, {
			customSiteTitle: 'Quaestio APIs Docs',
		});
	}

	app.use(helmet());

	await app.listen(PORT);
}

bootstrap()
	.then(() => console.info(`the application is running on port: ${PORT}`))
	.then(() =>
		console.info(
			`the application accept request from: ${
				ORIGIN === '*' ? 'any origin' : ORIGIN
			}`,
		),
	)
	.catch((error) => {
		console.group('error');
		console.info(error);
		console.groupEnd();
		process.exit(1);
	});
