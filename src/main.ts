import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

function customErrorMessageFormatter(errors: any[]) {
  const errorMessages = errors
    .map((error) => Object.values(error.constraints))
    .flat();
  return { status: 'error', message: errorMessages.join(', ') };
}

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('StereoPay Media')
    .setDescription('StereoPay Media API description')
    .setVersion('1.0')
    .addTag('stereopay')
    .addServer(process.env.APP_URL, 'Development server')
    .addTag('media')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  fs.writeFileSync('./swagger.json', JSON.stringify(document));

  SwaggerModule.setup('api', app, document, { url: process.env.APP_URL });

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException(customErrorMessageFormatter(errors)),
    }),
  );
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}
bootstrap();
