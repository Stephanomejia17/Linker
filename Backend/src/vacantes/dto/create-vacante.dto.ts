import { Type } from 'class-transformer';
import { TipoModalidad, TipoTrabajo } from '../entities/vacante.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { IsEnum, IsNumber } from 'class-validator';
import { VacanteHabilidade } from 'src/vacante_habilidades/entities/vacante_habilidade.entity';
import { VacantesIdioma } from 'src/vacantes_idiomas/entities/vacantes_idioma.entity';

export class CreateVacanteDto {
  titulo: string;
  //@IsEnum(TipoTrabajo)
  tipo_trabajo: TipoTrabajo;
  //@IsEnum(TipoModalidad)
  tipo_modalidad: TipoModalidad;
  //@IsNumber()
  //@Type(() => Number)
  salario: number;
  ubicacion: string;
  // aqui hubieron cambios era empresa:Empresa
  empresa: number;
  vacanteHabilidades?: number[];
  vacantesIdiomas?: number[];
}
