import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create <NestExpressApplication>(AppModule);

  // Enable CORS for the frontend application
  app.enableCors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true, // if using cookies/session
  });
  // Global validation pipe
  // This will automatically validate incoming requests based on DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true,
      exceptionFactory: (errors) => {
      const messages = errors.reduce((acc, err) => {
        acc[err.property] = Object.values(err.constraints || {})[0];
        return acc;
      }, {});
      return new BadRequestException(messages);
    },
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3000);
}
bootstrap();
