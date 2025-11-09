import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:30080', // El puerto angular
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`🚀 Backend running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
