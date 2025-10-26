import { Module } from '@nestjs/common';
import { HabilidadesService } from './habilidades.service';
import { HabilidadesController } from './habilidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostulanteHabilidades } from 'src/postulante_habilidades/entities/postulante_habilidades.entity';
import { Habilidades } from './entities/habilidades.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [PostulanteHabilidades, Habilidades],
      'postgresConnection',
    ),
    TypeOrmModule.forFeature(
      [PostulanteHabilidades, Habilidades],
      'oracleConnection',
    ),
  ],
  controllers: [HabilidadesController],
  providers: [HabilidadesService],
})
export class HabilidadesModule {}
