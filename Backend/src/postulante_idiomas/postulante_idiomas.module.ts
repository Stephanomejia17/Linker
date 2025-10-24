import { Module } from '@nestjs/common';
import { PostulanteIdiomasService } from './postulante_idiomas.service';
import { PostulanteIdiomasController } from './postulante_idiomas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idioma } from 'src/idiomas/entities/idioma.entity';
import { Postulante } from 'src/postulante/entities/postulante.entity';
import { PostulanteIdioma } from './entities/postulante_idioma.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Idioma, Postulante, Idioma, PostulanteIdioma]),
  ],
  controllers: [PostulanteIdiomasController],
  providers: [PostulanteIdiomasService],
})
export class PostulanteIdiomasModule {}
