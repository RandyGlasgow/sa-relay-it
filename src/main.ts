import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  new ValidationPipe({
    whitelist: true, // <-- automatically strips any unknown properties (security concern)
  });
  await app.listen(3000);
}
bootstrap();
