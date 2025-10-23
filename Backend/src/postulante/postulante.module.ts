import { Module } from '@nestjs/common';
import { PostulanteService } from './postulante.service';
import { PostulanteController } from './postulante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postulante } from './entities/postulante.entity';
import { User } from 'src/user/entities/user.entity';
import { Estudio } from 'src/estudios/entities/estudio.entity';
import { DetalleEstudio } from 'src/detalles_estudios/entities/detalle_estudio.entity';
import { PostulanteHabilidades } from 'src/postulante_habilidades/entities/postulante_habilidades.entity';
import { PostulanteIdioma } from 'src/postulante_idiomas/entities/postulante_idioma.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Postulante,
      Estudio,
      DetalleEstudio,
      PostulanteHabilidades,
      PostulanteIdioma,
    ]),
  ],
  controllers: [PostulanteController],
  providers: [PostulanteService],
})
export class PostulanteModule {}
