import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ExceptionsInterceptor } from './common/errors/interceptors/exceptions.interceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {doc} from "prettier";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // * Application Filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // * Exception Interceptors
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new ExceptionsInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Just a simple doc')
    .setVersion('1.0')
    .addTag('Cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.PORT || 3302);
}
bootstrap();
