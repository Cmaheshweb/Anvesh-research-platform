// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1'); // Set 'api/v1' prefix for all API endpoints
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // Use global validation pipe
  app.enableCors(); // Enable CORS (Cross-Origin Resource Sharing) - more specific config needed in production

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();