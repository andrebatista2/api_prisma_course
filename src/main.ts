import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ExceptionsInterceptor } from './common/errors/interceptors/exceptions.interceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor';

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

  await app.listen(process.env.PORT || 3302);
}
bootstrap();
