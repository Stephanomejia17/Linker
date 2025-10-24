import { Idioma } from 'src/idiomas/entities/idioma.entity';
import { Postulante } from 'src/postulante/entities/postulante.entity';

export class CreatePostulanteIdiomaDto {
  certificado: string;
  postulante: Postulante;
  idioma: Idioma;
}
