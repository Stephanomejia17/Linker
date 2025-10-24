import { Idioma } from 'src/idiomas/entities/idioma.entity';
import { Vacante } from 'src/vacantes/entities/vacante.entity';

export class CreateVacantesIdiomaDto {
  idioma: Idioma;
  vacante: Vacante;
}
