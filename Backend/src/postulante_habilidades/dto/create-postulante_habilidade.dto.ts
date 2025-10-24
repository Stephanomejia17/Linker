import { Habilidades } from 'src/habilidades/entities/habilidades.entity';
import { Postulante } from 'src/postulante/entities/postulante.entity';

export class CreatePostulanteHabilidadeDto {
  certificado: string;
  postulante: Postulante;
  habilidades: Habilidades;
}
