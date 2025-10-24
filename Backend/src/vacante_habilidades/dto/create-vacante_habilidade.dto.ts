import { Habilidades } from 'src/habilidades/entities/habilidades.entity';
import { Vacante } from 'src/vacantes/entities/vacante.entity';

export class CreateVacanteHabilidadeDto {
  vacante: Vacante;
  habilidades: Habilidades;
}
