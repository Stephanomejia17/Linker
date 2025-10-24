import { Estudio } from 'src/estudios/entities/estudio.entity';
import { Postulante } from 'src/postulante/entities/postulante.entity';

export class CreateDetalleEstudioDto {
  postulante: Postulante;
  estudio: Estudio;
  certificado: string;
}
