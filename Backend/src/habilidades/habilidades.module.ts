import { Module } from '@nestjs/common';
import { HabilidadesService } from './habilidades.service';
import { HabilidadesController } from './habilidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostulanteHabilidades } from 'src/postulante_habilidades/entities/postulante_habilidades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostulanteHabilidades])],
  controllers: [HabilidadesController],
  providers: [HabilidadesService],
})
export class HabilidadesModule {}
