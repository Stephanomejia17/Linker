import { Module } from '@nestjs/common';
import { PostulanteHabilidadesService } from './postulante_habilidades.service';
import { PostulanteHabilidadesController } from './postulante_habilidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habilidades } from 'src/habilidades/entities/habilidades.entity';
import { PostulanteHabilidades } from './entities/postulante_habilidades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habilidades, PostulanteHabilidades])],
  controllers: [PostulanteHabilidadesController],
  providers: [PostulanteHabilidadesService],
})
export class PostulanteHabilidadesModule {}
