import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // El puerto angular
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  const postgresDataSource = app.get<DataSource>(
    'postgresConnectionDataSource',
  );
  try {
    if (!postgresDataSource.isInitialized) {
      await postgresDataSource.initialize();
      console.log('Conectado a la base de datos principal (Supabase)');
    }
  } catch (err) {
    console.error('Error conectando a Supabase:', err.message);
  }

  try {
    const oracleDataSource = app.get<DataSource>('oracleConnectionDataSource');
    if (!oracleDataSource.isInitialized) {
      await oracleDataSource.initialize();
    }

    const result = await oracleDataSource.query('SELECT * FROM DUAL');
    console.log('Conectado a Oracle correctamente:', result);
  } catch (err) {
    console.error('Error conectando a Oracle:', err.message);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
