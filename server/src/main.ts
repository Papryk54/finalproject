import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  await app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
