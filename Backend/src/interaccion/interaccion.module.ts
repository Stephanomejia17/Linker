import { Module } from '@nestjs/common';
import { InteraccionService } from './interaccion.service';
import { InteraccionController } from './interaccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interaccion } from './entities/interaccion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interaccion], 'postgresConnection'),
    TypeOrmModule.forFeature([Interaccion], 'oracleConnection'),
  ],
  controllers: [InteraccionController],
  providers: [InteraccionService],
})
export class InteraccionModule {}
