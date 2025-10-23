import { Module } from '@nestjs/common';
import { PostulanteIdiomasService } from './postulante_idiomas.service';
import { PostulanteIdiomasController } from './postulante_idiomas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idioma } from 'src/idiomas/entities/idioma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Idioma])],
  controllers: [PostulanteIdiomasController],
  providers: [PostulanteIdiomasService],
})
export class PostulanteIdiomasModule {}
