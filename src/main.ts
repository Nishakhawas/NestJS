import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unvalidated props
      forbidNonWhitelisted: true, // optional but good for security
      transform: true, // auto-transform payloads to DTO instances
    }),
  );

  await app.listen(3000);
}
bootstrap();
